"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const defaultStyle = "mapbox://styles/mapbox/standard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type MapProps = {
  center: [number, number];
  zoom?: number;
  styleUrl?: string;
  className?: string;
  disableScrollZoom?: boolean;
  showMarker?: boolean;
  markerColor?: string;
  enable3d?: boolean;
  pitch?: number;
  bearing?: number;
  interactive?: boolean;
};

function Map({
  center,
  zoom = 11,
  styleUrl = defaultStyle,
  className,
  disableScrollZoom = true,
  showMarker = true,
  markerColor = "#2563eb",
  enable3d = false,
  pitch = 60,
  bearing = 24,
  interactive = true,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const added3dRef = useRef(false);
  const [hasToken, setHasToken] = useState(
    Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
  );

  useEffect(() => {
    setHasToken(Boolean(mapboxgl.accessToken));
  }, []);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
    if (token && mapboxgl.accessToken !== token) {
      mapboxgl.accessToken = token;
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styleUrl,
      center,
      zoom,
      pitch,
      bearing,
      interactive,
      attributionControl: false,
      touchZoomRotate: false,
      dragRotate: false,
    });

    if (disableScrollZoom || !interactive) {
      map.scrollZoom.disable();
    }
    if (!interactive) {
      map.boxZoom.disable();
      map.dragPan.disable();
      map.keyboard.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();
    }

    mapRef.current = map;

    if (showMarker) {
      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat(center)
        .addTo(map);
      markerRef.current = marker;
    }

    return () => {
      markerRef.current?.remove();
      map.remove();
      markerRef.current = null;
      mapRef.current = null;
      added3dRef.current = false;
    };
  }, [
    center,
    zoom,
    styleUrl,
    disableScrollZoom,
    showMarker,
    markerColor,
    pitch,
    bearing,
    interactive,
  ]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(center);
    markerRef.current?.setLngLat(center);
  }, [center]);

  useEffect(() => {
    if (zoom && mapRef.current) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setPitch(pitch);
    mapRef.current.setBearing(bearing);
  }, [pitch, bearing]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !enable3d || added3dRef.current) return;

    const add3d = () => {
      if (added3dRef.current) return;

      const hasCompositeSource = Boolean(map.getSource("composite"));
      if (!hasCompositeSource) {
        // Bail if the style doesn't expose the default composite source (avoids 3d layer errors).
        return;
      }

      if (!map.getSource("mapbox-dem")) {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }

      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.1 });

      map.setLight({
        anchor: "viewport",
        position: [1.15, 180, 80],
        color: "#ffffff",
        intensity: 0.6,
      });

      if (!map.getLayer("sky")) {
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0, 90],
            "sky-atmosphere-sun-intensity": 12,
          },
        });
      }

      const labelLayer = map
        .getStyle()
        ?.layers?.find((l) => l.type === "symbol" && l.layout?.["text-field"])
        ?.id;

      if (!map.getLayer("3d-buildings")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 14,
            paint: {
              "fill-extrusion-color": "#d1d5db",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.85,
              "fill-extrusion-vertical-gradient": true,
            },
          },
          labelLayer
        );
      }

      added3dRef.current = true;
    };

    if (map.isStyleLoaded()) {
      add3d();
    } else {
      map.once("style.load", add3d);
    }

    return () => {
      if (!map) return;

      // When the map is torn down before the style loads, map.getLayer/getSource
      // can throw because the underlying style is missing. Guard with getStyle().
      const style = map.getStyle?.();
      if (!style) {
        added3dRef.current = false;
        return;
      }

      if (map.getLayer("3d-buildings")) map.removeLayer("3d-buildings");
      if (map.getLayer("sky")) map.removeLayer("sky");
      if (map.getSource("mapbox-dem")) map.removeSource("mapbox-dem");
      if (map.getTerrain()) map.setTerrain(null);
      added3dRef.current = false;
    };
  }, [enable3d]);

  if (!hasToken) {
    return (
      <div className={cn("flex h-full items-center justify-center", className)}>
        <p className="text-xs text-muted-foreground text-center px-4">
          Add NEXT_PUBLIC_MAPBOX_TOKEN to show the map.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} />
  );
}

export { Map };

"use client";
import { useEffect, useRef } from "react";
import maplibregl, { Marker } from "maplibre-gl";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

interface MapProps {
  lon: number;
  lat: number;
  zoom?: number;
}

export default function Map({ lon, lat, zoom}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=a2dd592013984310b2476c9d1fded699`,
      center: [lon, lat],
      zoom,
    });

    map.addControl(new maplibregl.NavigationControl());
    mapInstance.current = map;

    map.on("load", () => {
      // -------------------- FON --------------------
      const geojson1: GeoJSON.FeatureCollection<GeoJSON.Point> = {
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "Point", coordinates: [20.4751, 44.7727] }, properties: {} },
        ],
      };
      map.addSource("custom-points-fon", { type: "geojson", data: geojson1 });
      map.addLayer({
        id: "circle-fon",
        type: "circle",
        source: "custom-points-fon",
        paint: {
          "circle-radius": 10,
          "circle-color": "#ff0080",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        },
      });
      map.addLayer({
        id: "label-fon",
        type: "symbol",
        source: "custom-points-fon",
        layout: {
          "text-field": "PerPL [FON]",
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: { "text-color": "#000000" },
      });

      // -------------------- MIRIJEVO --------------------
      const geojson2: GeoJSON.FeatureCollection<GeoJSON.Point> = {
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "Point", coordinates: [20.5281, 44.7903] }, properties: {} },
        ],
      };
      map.addSource("custom-points-mirijevo", { type: "geojson", data: geojson2 });
      map.addLayer({
        id: "circle-mirijevo",
        type: "circle",
        source: "custom-points-mirijevo",
        paint: {
          "circle-radius": 10,
          "circle-color": "#a42ee3",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        },
      });
      map.addLayer({
        id: "label-mirijevo",
        type: "symbol",
        source: "custom-points-mirijevo",
        layout: {
          "text-field": "PerPL [MIRIJEVO]",
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: { "text-color": "#000000" },
      });

      // -------------------- VUKOV SPOMENIK --------------------
      const geojson3: GeoJSON.FeatureCollection<GeoJSON.Point> = {
        type: "FeatureCollection",
        features: [
          { type: "Feature", geometry: { type: "Point", coordinates: [20.4810, 44.8043] }, properties: {} },
        ],
      };
      map.addSource("custom-points-vukov", { type: "geojson", data: geojson3 });
      map.addLayer({
        id: "circle-vukov",
        type: "circle",
        source: "custom-points-vukov",
        paint: {
          "circle-radius": 10,
          "circle-color": "#b81b8e",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        },
      });
      map.addLayer({
        id: "label-vukov",
        type: "symbol",
        source: "custom-points-vukov",
        layout: {
          "text-field": "PerPL [VUKOV SPOMENIK]",
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: { "text-color": "#000000" },
      });
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [lat, lon, zoom]);

  return (
    <div
      ref={mapContainer}
      className="map-container rounded shadow-lg"
      style={{ width: "100%", height: "400px" }}
    />
  );
}


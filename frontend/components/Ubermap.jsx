import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext } from "react";
import { Usercontext } from "../src/context/Usecontext";

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const normalizeCoordinate = (value) => {
  if (!value) return null;

  // [lng, lat]
  if (Array.isArray(value) && value.length >= 2) {
    const lng = toNumber(value[0]);
    const lat = toNumber(value[1]);
    return lng !== null && lat !== null ? [lng, lat] : null;
  }

  // { longitude, latitude } | { lng, lat } | { lon, lat }
  const lng = toNumber(value.longitude ?? value.lng ?? value.lon);
  const lat = toNumber(value.latitude ?? value.lat);
  if (lng !== null && lat !== null) return [lng, lat];

  return null;
};

const isValidLngLat = (coord) =>
  Array.isArray(coord) &&
  coord.length === 2 &&
  Number.isFinite(coord[0]) &&
  Number.isFinite(coord[1]) &&
  coord[0] >= -180 &&
  coord[0] <= 180 &&
  coord[1] >= -90 &&
  coord[1] <= 90;

export default function UberMap({ set1cordinates, set2cordinates }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({ start: null, end: null });
  const resizeObserverRef = useRef(null);
  const { droploc } = useContext(Usercontext);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=odcGMQSoD0v2ILfcZ343`,
      center: [77.5946, 12.9716],
      zoom: 13,
    });
    mapInstanceRef.current = map;

    map.dragPan.enable();
    map.scrollZoom.enable();
    map.doubleClickZoom.enable();
    map.touchZoomRotate.enable();

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      map.resize();
    });

   
    const resizeNow = () => {
      try {
        map.resize();
      } catch {
        // no-op
      }
    };

    const timer = setTimeout(resizeNow, 0);
    if (typeof ResizeObserver !== "undefined" && mapRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => resizeNow());
      resizeObserverRef.current.observe(mapRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = { start: null, end: null };
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const defaultStart = [77.5946, 12.9716];
    const start = normalizeCoordinate(set1cordinates) || defaultStart;

    const end = normalizeCoordinate(droploc) || normalizeCoordinate(set2cordinates);

    if (!isValidLngLat(start)) return;

    map.setCenter(start);

    if (markersRef.current.start) markersRef.current.start.remove();
    markersRef.current.start = new maplibregl.Marker({ color: "#000000" })
      .setLngLat(start)
      .addTo(map);

    if (markersRef.current.end) {
      markersRef.current.end.remove();
      markersRef.current.end = null;
    }

    if (!end || !isValidLngLat(end)) {
      if (map.getLayer("route-line")) map.removeLayer("route-line");
      if (map.getSource("route")) map.removeSource("route");
      return;
    }

    // Skip ORS call if start/end are effectively the same point
    if (Math.abs(start[0] - end[0]) < 1e-6 && Math.abs(start[1] - end[1]) < 1e-6) {
      if (map.getLayer("route-line")) map.removeLayer("route-line");
      if (map.getSource("route")) map.removeSource("route");
      return;
    }

    markersRef.current.end = new maplibregl.Marker({ color: "#000000" })
      .setLngLat(end)
      .addTo(map);

    const drawRoute = async () => {
      try {
        // OSRM — free, no API key required
        const osrmURL = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;

        const response = await fetch(osrmURL);

        const data = await response.json();
        if (!response.ok || data.code !== "Ok") {
          return;
        }

        if (!data?.routes?.length) {
          return;
        }

        const coords = data.routes[0].geometry.coordinates;
        const routeGeoJson = {
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
        };

        if (map.getSource("route")) {
          map.getSource("route").setData(routeGeoJson);
        } else {
          map.addSource("route", {
            type: "geojson",
            data: routeGeoJson,
          });

          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#000000", "line-width": 6 },
          });
        }

        const bounds = new maplibregl.LngLatBounds(start, start);
        bounds.extend(end);
        map.fitBounds(bounds, { padding: 80, duration: 700 });
      } catch {
        // no-op
      }
    };

    if (map.isStyleLoaded()) {
      drawRoute();
    } else {
      map.once("load", drawRoute);
    }
  }, [set1cordinates, set2cordinates, droploc]);

  return (
    <div className="relative w-full h-full min-h-60">
      <div ref={mapRef} className="w-full h-full" />

      
    </div>
  );
}

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext } from "react";
import { Usercontext } from "../src/context/Usecontext";
export default function UberMap({ set1cordinates, set2cordinates,Location }) {
  const mapRef = useRef(null);
  const { droploc } = useContext(Usercontext);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=odcGMQSoD0v2ILfcZ343`,
      center: [77.5946, 12.9716],
      zoom: 13,
    });

    map.dragPan.enable();
    map.scrollZoom.enable();
    map.doubleClickZoom.enable();
    map.touchZoomRotate.enable();

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", async () => {
      const start =
        set1cordinates?.longitude && set1cordinates?.latitude
          ? [set1cordinates.longitude, set1cordinates.latitude]
          : [77.5946, 12.9716];

      const end = droploc
        ? droploc
        : set2cordinates?.longitude && set2cordinates?.latitude
        ? [set2cordinates.longitude, set2cordinates.latitude]
        : [77.574, 13.0095];

      console.log("map rendered");

      map.setCenter(start);

      const orsURL =
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

      const response = await fetch(orsURL, {
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_ORS_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: [start, end],
          instructions: true,
          geometry_simplify: false,
        }),
      });

      const data = await response.json();
      const coords = data.features[0].geometry.coordinates;
      if (!data?.features?.length) {
        console.error("No route found");
        return;
      }

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
        },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#000000", "line-width": 6 },
      });

      new maplibregl.Marker({ color: "#000000" }).setLngLat(start).addTo(map);
      new maplibregl.Marker({ color: "#000000" }).setLngLat(end).addTo(map);
    });

    return () => map.remove();
  }, [set1cordinates, set2cordinates, droploc]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />

      
    </div>
  );
}

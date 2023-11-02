import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  map,
  tileLayer,
  marker,
  Map as LeafletMap,
  divIcon,
  LeafletMouseEvent,
  latLng,
  Marker,
  polyline,
  Polyline,
} from "leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";

type onAddWaypointCallback = (coordinate: [number, number]) => any;

type MapProps = {
  waypoints: [number, number][];
  onAddWaypoint: onAddWaypointCallback;
};

function addMarkersEffect(
  trackingMap: LeafletMap,
  waypoints: [number, number][]
) {
  const markers = waypoints.map(([lat, lng], index) => {
    const icon = divIcon({
      className: "WaypointMarker",
      html: (index + 1).toString(),
    });

    const a = "Hello";

    return marker([lat, lng], { icon }).addTo(trackingMap);
  });

  const path = polyline(waypoints).addTo(trackingMap);

  return () => {
    markers.forEach((marker) => trackingMap.removeLayer(marker));
    trackingMap.removeLayer(path);
  };
}

function handleClickEffect(
  trackingMap: LeafletMap,
  callback: onAddWaypointCallback
) {
  const handleAddWaypoint = (event: LeafletMouseEvent) =>
    callback([event.latlng.lat, event.latlng.lng]);

  trackingMap.on("click", handleAddWaypoint);

  return () => {
    trackingMap.off("click", handleAddWaypoint);
  };
}

const Map = ({ waypoints, onAddWaypoint }: MapProps) => {
  const trackingMapRef = useRef<LeafletMap>();

  const mappingRef = useCallback(() => {
    const trackingMap = map("Map");

    trackingMapRef.current = trackingMap;

    trackingMap.setView([46.37865092969462, 13.836569292167983], 10);

    tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      crossOrigin: true,
    }).addTo(trackingMap);
  }, []);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      return handleClickEffect(trackingMap, onAddWaypoint);
    }
  }, [waypoints]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      return addMarkersEffect(trackingMap, waypoints);
    }
  }, [waypoints]);

  return <div id="Map" ref={mappingRef}></div>;
};

export default Map;

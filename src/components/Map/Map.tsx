import React, { useCallback, useEffect, useRef } from "react";
import {
  map,
  tileLayer,
  marker,
  Map as LeafletMap,
  divIcon,
  LeafletMouseEvent,
  polyline,
  LatLngTuple,
} from "leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";

const INITIAL_COORDINATES: LatLngTuple = [
  46.37865092969462, 13.836569292167983,
];

const INITIAL_ZOOMLEVEL = 10;

type onAddWaypointCallback = (coordinate: LatLngTuple) => any;
type onMoveWaypointCallback = (index: number, coordinate: LatLngTuple) => any;

type MapProps = {
  waypoints: LatLngTuple[];
  onAddWaypoint: onAddWaypointCallback;
  onMoveWaypoint: onMoveWaypointCallback;
};

function addMarkersEffect(
  trackingMap: LeafletMap,
  waypoints: LatLngTuple[],
  onMoveWaypoint: onMoveWaypointCallback
) {
  const markers = waypoints.map(([lat, lng], index) => {
    const icon = divIcon({
      className: "WaypointMarker",
      html: (index + 1).toString(),
    });

    const waypointMarker = marker([lat, lng], { icon, draggable: true });

    waypointMarker.addTo(trackingMap);

    waypointMarker.on("moveend", (event) => {
      const { lat, lng } = event.target.getLatLng();
      onMoveWaypoint(index, [lat, lng]);
    });

    return waypointMarker;
  });

  const path = polyline(waypoints).addTo(trackingMap);

  return () => {
    markers.forEach((marker) => {
      trackingMap.removeLayer(marker);
    });
    trackingMap.removeLayer(path);
  };
}

function handleClickEffect(
  trackingMap: LeafletMap,
  onAddWaypoint: onAddWaypointCallback
) {
  const handleAddWaypoint = (event: LeafletMouseEvent) =>
    onAddWaypoint([event.latlng.lat, event.latlng.lng]);

  trackingMap.on("click", handleAddWaypoint);

  return () => {
    trackingMap.off("click", handleAddWaypoint);
  };
}

const Map = ({ waypoints, onAddWaypoint, onMoveWaypoint }: MapProps) => {
  const trackingMapRef = useRef<LeafletMap>();

  const mappingRef = useCallback(() => {
    const trackingMap = map("Map");

    trackingMapRef.current = trackingMap;

    trackingMap.setView(INITIAL_COORDINATES, INITIAL_ZOOMLEVEL);

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
  }, [onAddWaypoint, waypoints]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      return addMarkersEffect(trackingMap, waypoints, onMoveWaypoint);
    }
  }, [onMoveWaypoint, waypoints]);

  return <div id="Map" ref={mappingRef}></div>;
};

export default Map;

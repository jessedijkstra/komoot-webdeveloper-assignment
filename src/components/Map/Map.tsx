import React, { useEffect, useRef } from "react";
import {
  map,
  tileLayer,
  marker,
  Map as LeafletMap,
  divIcon,
  LeafletMouseEvent,
  polyline,
  PointTuple,
} from "leaflet";
import "./style.css";
import "leaflet/dist/leaflet.css";

const INITIAL_COORDINATES: PointTuple = [46.37865092969462, 13.836569292167983];

const INITIAL_ZOOMLEVEL = 10;

type onAddWaypointCallback = (coordinate: PointTuple) => any;
type onMoveWaypointCallback = (index: number, coordinate: PointTuple) => any;

type MapProps = {
  waypoints: PointTuple[];
  onAddWaypoint: onAddWaypointCallback;
  onMoveWaypoint: onMoveWaypointCallback;
};

function addMap() {
  const trackingMap = map("Map");

  trackingMap.setView(INITIAL_COORDINATES, INITIAL_ZOOMLEVEL);

  tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    crossOrigin: true,
  }).addTo(trackingMap);

  return trackingMap;
}

function createMarkers(
  waypoints: PointTuple[],
  onMoveWaypoint: onMoveWaypointCallback
) {
  return waypoints.map(([lat, lng], index) => {
    const icon = divIcon({
      className: "WaypointMarker",
      html: (index + 1).toString(),
    });

    const waypointMarker = marker([lat, lng], { icon, draggable: true });

    waypointMarker.on("moveend", (event) => {
      const { lat, lng } = event.target.getLatLng();
      onMoveWaypoint(index, [lat, lng]);
    });

    return waypointMarker;
  });
}

const Map = ({ waypoints, onAddWaypoint, onMoveWaypoint }: MapProps) => {
  const trackingMapRef = useRef<LeafletMap>();

  useEffect(() => {
    const trackingMap = addMap();

    trackingMapRef.current = trackingMap;

    return () => {
      trackingMap.remove();
    };
  }, []);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      const markers = createMarkers(waypoints, onMoveWaypoint);

      markers.forEach((marker) => marker.addTo(trackingMap));

      return () => {
        markers.forEach((marker) => {
          trackingMap.removeLayer(marker);
        });
      };
    }
  }, [onMoveWaypoint, waypoints]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      const path = polyline(waypoints).addTo(trackingMap);

      return () => {
        trackingMap.removeLayer(path);
      };
    }
  }, [waypoints]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      const handleAddWaypoint = (event: LeafletMouseEvent) =>
        onAddWaypoint([event.latlng.lat, event.latlng.lng]);

      trackingMap.on("click", handleAddWaypoint);

      return () => {
        trackingMap.off("click", handleAddWaypoint);
      };
    }
  }, [onAddWaypoint, waypoints]);

  return <div id="Map"></div>;
};

export default Map;

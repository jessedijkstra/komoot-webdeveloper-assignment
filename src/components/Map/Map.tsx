import React, { useEffect, useRef } from "react";
import {
  Map as LeafletMap,
  LeafletMouseEvent,
  polyline,
  LeafletEvent,
} from "leaflet";
import KomootMarker from "../../map/KomootMarker";
import "./style.css";
import "leaflet/dist/leaflet.css";
import createMap from "../../map/createMap";
import updateOrAddMarkers from "../../map/addOrUpdateMarkers";
import { Coordinate } from "../../map/Coordinate";

type onAddWaypointCallback = (coordinate: Coordinate) => any;
type onMoveWaypointCallback = (index: number, coordinate: Coordinate) => any;
type onHilightWaypointCallback = (index: number) => any;
type onDimWaypointCallback = (index: number) => any;

type MapProps = {
  waypoints: Coordinate[];
  hilightIndex?: number;
  onAddWaypoint: onAddWaypointCallback;
  onMoveWaypoint: onMoveWaypointCallback;
  onHilightWaypoint: onHilightWaypointCallback;
  onDimWaypoint: onDimWaypointCallback;
};

const Map = ({
  waypoints,
  onAddWaypoint,
  onMoveWaypoint,
  onHilightWaypoint,
  onDimWaypoint,
  hilightIndex,
}: MapProps) => {
  const containerRef = useRef(null);
  const trackingMapRef = useRef<LeafletMap>();
  const markersRef = useRef<KomootMarker[]>([]);

  useEffect(() => {
    const trackingMap = createMap(
      containerRef.current as unknown as HTMLElement
    );
    trackingMapRef.current = trackingMap;

    return () => {
      trackingMap.remove();
    };
  }, []);

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
  }, [onAddWaypoint]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;
    const currentMarkers = markersRef.current;

    if (trackingMap) {
      markersRef.current = updateOrAddMarkers(
        trackingMap,
        currentMarkers,
        waypoints,
        hilightIndex
      );
    }
  }, [waypoints, hilightIndex]);

  useEffect(() => {
    const markers = markersRef.current;

    markers.forEach((marker, index) => {
      marker.on("drag", (event: LeafletEvent) => {
        const { lat, lng } = event.target.getLatLng();
        onMoveWaypoint(index, [lat, lng]);
      });

      marker.on("mouseover", () => onHilightWaypoint(index));
      marker.on("mouseout", () => onDimWaypoint(index));
    });
  }, [onDimWaypoint, onHilightWaypoint, onMoveWaypoint]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      const path = polyline(waypoints).addTo(trackingMap);

      return () => {
        trackingMap.removeLayer(path);
      };
    }
  }, [waypoints]);

  return <div className="Map" ref={containerRef}></div>;
};

export default Map;

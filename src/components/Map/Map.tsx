import React, { useEffect, useRef, useState } from "react";
import {
  map,
  tileLayer,
  Map as LeafletMap,
  divIcon,
  LeafletMouseEvent,
  polyline,
  PointTuple,
  Marker as LeafletMarker,
  LeafletEvent,
  Marker,
  LatLngExpression,
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

class KomootMarker extends Marker {
  dragged = false;
  label = "";

  constructor(latlng: LatLngExpression, label: string) {
    super(latlng, {
      icon: divIcon({
        className: "WaypointMarker",
        html: label,
      }),
      draggable: true,
    });

    this.label = label;

    this.on("dragstart", () => (this.dragged = true));
    this.on("dragend", () => (this.dragged = false));
  }
  setLabel(label: string) {
    if (this.label !== label) {
      this.label = label;

      this.setIcon(
        divIcon({
          className: "WaypointMarker",
          html: label,
        })
      );
    }
  }
  updateMarker(coordinate: PointTuple, label: string) {
    this.setLabel(label);

    if (!this.dragged) {
      this.setLatLng(coordinate);
    }
  }
}

const Map = ({ waypoints, onAddWaypoint, onMoveWaypoint }: MapProps) => {
  const trackingMapRef = useRef<LeafletMap>();
  const markersRef = useRef<KomootMarker[]>([]);

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
      const newMarkers = waypoints.map((coordinate, index) => {
        const currentMarker = currentMarkers[index];
        const label = `${index + 1}`;

        if (currentMarker) {
          currentMarker.updateMarker(coordinate, label);

          return currentMarker;
        }

        const newMarker = new KomootMarker(coordinate, label);

        trackingMap.addLayer(newMarker);

        return newMarker;
      });

      currentMarkers.slice(newMarkers.length).forEach((markerToRemove) => {
        trackingMap.removeLayer(markerToRemove);
      });

      markersRef.current = newMarkers;
    }
  }, [waypoints]);

  useEffect(() => {
    const markers = markersRef.current;

    const callbacks: [LeafletMarker, any][] = markers.map((marker, index) => {
      const callback = (event: LeafletEvent) => {
        const { lat, lng } = event.target.getLatLng();
        onMoveWaypoint(index, [lat, lng]);
      };

      marker.on("drag", callback);

      return [marker, callback];
    });

    return () => {
      callbacks.forEach((callbackTuple) => {
        const [marker, callback] = callbackTuple;
        marker.off("drag", callback);
      });
    };
  }, [onMoveWaypoint]);

  useEffect(() => {
    const trackingMap = trackingMapRef.current;

    if (trackingMap) {
      const path = polyline(waypoints).addTo(trackingMap);

      return () => {
        trackingMap.removeLayer(path);
      };
    }
  }, [waypoints]);

  return <div id="Map"></div>;
};

export default Map;

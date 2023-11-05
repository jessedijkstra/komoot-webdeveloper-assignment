import { Map, PointTuple } from "leaflet";
import KomootMarker from "./KomootMarker";

export default function updateOrAddMarkers(
  trackingMap: Map,
  currentMarkers: KomootMarker[],
  waypoints: PointTuple[],
  hilightIndex?: number
) {
  const newMarkers = waypoints.map((coordinate, index) => {
    const currentMarker = currentMarkers[index];
    const label = `${index + 1}`;

    if (currentMarker) {
      currentMarker.updateMarker(
        coordinate,
        label,
        hilightIndex === undefined || hilightIndex === index
      );

      return currentMarker;
    }

    const newMarker = new KomootMarker(
      coordinate,
      label,
      hilightIndex === undefined || hilightIndex === index
    );

    trackingMap.addLayer(newMarker);

    return newMarker;
  });

  currentMarkers.slice(newMarkers.length).forEach((markerToRemove) => {
    trackingMap.removeLayer(markerToRemove);
  });

  return newMarkers;
}

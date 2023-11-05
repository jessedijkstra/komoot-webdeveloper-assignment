import { map, tileLayer } from "leaflet";
import { Coordinate } from "../../utils/map/Coordinate";

const INITIAL_COORDINATES: Coordinate = [46.37865092969462, 13.836569292167983];

const INITIAL_ZOOMLEVEL = 10;

export default function addMapToDOM(element: HTMLElement) {
  const trackingMap = map(element);

  trackingMap.setView(INITIAL_COORDINATES, INITIAL_ZOOMLEVEL);

  tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    crossOrigin: true,
  }).addTo(trackingMap);

  return trackingMap;
}

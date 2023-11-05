import { Coordinate } from "./Coordinate";

const waypointElement = ([lat, lng]: Coordinate) =>
  `\t<wpt lat="${lat}" lon="${lng}"></wpt>`;

const routepointElement = ([lat, lng]: Coordinate) =>
  `\t\t<rtept lat="${lat}" lon="${lng}"></rtept>`;

export default function coordindatesToGPX(coordinates: Coordinate[]) {
  const longitudes = coordinates.map(([_lat, lon]) => lon);
  const latitudes = coordinates.map(([lat, _lon]) => lat);
  const minLat = Math.min(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLat = Math.max(...latitudes);
  const maxLon = Math.max(...longitudes);

  return (
    `<?xml version="1.0"?>\n` +
    `<gpx version="1.0" creator="ExpertGPS 1.1 - https://www.topografix.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">\n` +
    `\t<bounds minlat="${minLat}" minlon="${minLon}" maxlat="${maxLat}" maxlon="${maxLon}"/>\n` +
    coordinates.map(waypointElement).join("\n") +
    `\n` +
    `\t<rte>\n` +
    coordinates.map(routepointElement).join("\n") +
    `\n` +
    `\t</rte>\n` +
    `</gpx>`
  );
}

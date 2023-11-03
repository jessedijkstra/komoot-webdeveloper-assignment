import { LatLngTuple } from "leaflet";

export default function waypointsToGPX(waypoints: LatLngTuple[]) {
    const longitudes = waypoints.map(([_lat, lon])=> lon);
    const latitudes = waypoints.map(([lat, _lon])=> lat);
    const minLat = Math.min(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLat = Math.max(...latitudes);
    const maxLon = Math.max(...longitudes);

    return `<?xml version="1.0"?>\n` 
           + `<gpx version="1.0" creator="ExpertGPS 1.1 - https://www.topografix.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">\n`
           + `  <bounds minlat="${minLat}" minlon="${minLon}" maxlat="${maxLat}" maxlon="${maxLon}"/>\n`
           + waypoints.map(([lat, lon]) =>
             `  <wpt lat="${lat}" lon="${lon}"></wpt>`).join("\n") + '\n'
           + `  <rte>\n`
           + waypoints.map(([lat, lon]) => 
             `      <rtept lat="${lat}" lon="${lon}"></rtept>`).join("\n") + '\n'
           + `  </rte>\n`
           + `</gpx>`;
}
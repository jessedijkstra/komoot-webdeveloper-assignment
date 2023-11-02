export default function waypointsToGPX(waypoints: [number, number][]) {
    const longitudes = waypoints.map(([_lat, lon])=> lon);
    const latitudes = waypoints.map(([lat, _lon])=> lat);
    const minLat = Math.min(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLat = Math.max(...latitudes);
    const maxLon = Math.max(...longitudes);

    return `<?xml version="1.0"?>
<gpx version="1.0" creator="ExpertGPS 1.1 - https://www.topografix.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">                
<bounds minlat="${minLat}" minlon="${minLon}" maxlat="${maxLat}" maxlon="${maxLon}"/>
${waypoints.reduce(
    (string, [lat, lon]) =>
    `${string}\n<wpt lat="${lat}" lon="${lon}"></wpt>`,
    ""
)}
<rte>
    ${waypoints.reduce(
        (string, [lat, lon]) =>
        `${string}\n<rtept lat="${lat}" lon="${lon}"></rtept>`,
        ""
    )}
</rte>
</gpx>`;
}
import { LatLngTuple } from "leaflet";
import waypointsToGPX from "./waypointsToGPX";

test("creates a bounded GPX string", () => {
    const coordinates: LatLngTuple[] = [[1, 1], [2, 2], [3, 3]];
    const gpxString = waypointsToGPX(coordinates);

    expect(gpxString).toBe(
          `<?xml version="1.0"?>\n`
        + `<gpx version="1.0" creator="ExpertGPS 1.1 - https://www.topografix.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">\n`
        + `  <bounds minlat="1" minlon="1" maxlat="3" maxlon="3"/>\n`
        + `  <wpt lat="1" lon="1"></wpt>\n`
        + `  <wpt lat="2" lon="2"></wpt>\n`
        + `  <wpt lat="3" lon="3"></wpt>\n`
        + `  <rte>\n`
        + `      <rtept lat="1" lon="1"></rtept>\n`
        + `      <rtept lat="2" lon="2"></rtept>\n`
        + `      <rtept lat="3" lon="3"></rtept>\n`
        + `  </rte>\n`
        + `</gpx>`
    );
});
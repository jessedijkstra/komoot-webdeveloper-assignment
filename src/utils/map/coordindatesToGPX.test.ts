import { Coordinate } from "./Coordinate";
import coordindatesToGPX from "./coordinatesToGPX";

test("creates a bounded GPX string", () => {
  const coordinates: Coordinate[] = [
    [1, 1],
    [2, 2],
    [3, 3],
  ];
  const gpxString = coordindatesToGPX(coordinates);

  expect(gpxString).toBe(
    `<?xml version="1.0"?>\n` +
      `<gpx version="1.0" creator="ExpertGPS 1.1 - https://www.topografix.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">\n` +
      `\t<bounds minlat="1" minlon="1" maxlat="3" maxlon="3"/>\n` +
      `\t<wpt lat="1" lon="1"></wpt>\n` +
      `\t<wpt lat="2" lon="2"></wpt>\n` +
      `\t<wpt lat="3" lon="3"></wpt>\n` +
      `\t<rte>\n` +
      `\t\t<rtept lat="1" lon="1"></rtept>\n` +
      `\t\t<rtept lat="2" lon="2"></rtept>\n` +
      `\t\t<rtept lat="3" lon="3"></rtept>\n` +
      `\t</rte>\n` +
      `</gpx>`
  );
});

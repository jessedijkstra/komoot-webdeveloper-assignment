import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map/Map";
import DraggableList from "./components/DraggableList/DraggableList";
import removeIndexFromList from "./utils/removeItemFromList";
import repositionItemInList from "./utils/repositionItemInList";
import waypointsToGPX from "./utils/waypointsToGPX";

type Coordinate = [number, number];

export default function App() {
  const [waypoints, setWaypoints] = useState<Coordinate[]>([]);

  function handleRemoveWaypoint(index: number) {
    setWaypoints(removeIndexFromList(waypoints, index));
  }

  function handleRepositionWaypoint(fromIndex: number, toIndex: number) {
    setWaypoints(repositionItemInList(waypoints, fromIndex, toIndex));
  }

  function handleAddWaypoint(coordinate: Coordinate) {
    setWaypoints([...waypoints, coordinate]);
  }

  function handleDownload(_event: any) {
    const gpxContent = waypointsToGPX(waypoints);
    const element = document.createElement("a");
    const file = new Blob([gpxContent], { type: "application/octet-stream" });

    element.style.display = "none";
    element.href = URL.createObjectURL(file);
    element.download = "route.gpx";

    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="App">
      <aside className="RouteBuilderSidebar">
        <h1 className="logo">komoot</h1>

        <h2 className="RouteBuilderSidebarTitle">Route Builder</h2>
        <DraggableList
          onRemove={handleRemoveWaypoint}
          onReposition={handleRepositionWaypoint}
          list={waypoints.map((_coordinate, index) => `Waypoint ${index + 1}`)}
        ></DraggableList>
        <button className="DownloadButton" onClick={handleDownload}>
          Download your Route
        </button>
      </aside>
      <main className="RouteBuilderMap">
        <Map waypoints={waypoints} onAddWaypoint={handleAddWaypoint} />
      </main>
    </div>
  );
}

import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map/Map";
import DraggableList from "./components/DraggableList/DraggableList";
import removeIndexFromList from "./utils/removeItemFromList";
import reorderItemInList from "./utils/reorderItemInList";
import waypointsToGPX from "./utils/waypointsToGPX";
import replaceItemInList from "./utils/replaceItemInList";
import { PointTuple } from "leaflet";

export default function App() {
  const [waypoints, setWaypoints] = useState<PointTuple[]>([]);

  function handleRemoveWaypoint(index: number) {
    setWaypoints(removeIndexFromList(waypoints, index));
  }

  function handleRepositionWaypoint(fromIndex: number, toIndex: number) {
    setWaypoints(reorderItemInList(waypoints, fromIndex, toIndex));
  }

  function handleAddWaypoint(coordinate: PointTuple) {
    setWaypoints([...waypoints, coordinate]);
  }

  function handleMoveWaypoint(index: number, coordinate: PointTuple) {
    setWaypoints(replaceItemInList(waypoints, index, coordinate));
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
        <h1 className="Logo">komoot</h1>

        <h2 className="RouteBuilderSidebarTitle">Route Builder</h2>
        <DraggableList
          onRemoveItem={handleRemoveWaypoint}
          onReorderItem={handleRepositionWaypoint}
          list={waypoints.map((_coordinate, index) => `Waypoint ${index + 1}`)}
        ></DraggableList>
        <button className="DownloadButton" onClick={handleDownload}>
          Download your Route
        </button>
      </aside>
      <main className="RouteBuilderMap">
        <Map
          waypoints={waypoints}
          onAddWaypoint={handleAddWaypoint}
          onMoveWaypoint={handleMoveWaypoint}
        />
      </main>
    </div>
  );
}

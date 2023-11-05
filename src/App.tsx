import React, { useState } from "react";
import "./App.css";
import LeafletMap from "./components/Map/Map";
import DraggableList from "./components/DraggableList/DraggableList";
import removeIndexFromList from "./utils/removeItemFromList";
import reorderItemInList from "./utils/reorderItemInList";
import waypointsToGPX from "./utils/waypointsToGPX";
import replaceItemInList from "./utils/replaceItemInList";
import { PointTuple } from "leaflet";

type Waypoint = {
  coordinate: PointTuple;
  hilight: boolean;
};

export default function App() {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  function handleRemoveWaypoint(index: number) {
    setWaypoints(removeIndexFromList(waypoints, index));
  }

  function handleRepositionWaypoint(fromIndex: number, toIndex: number) {
    setWaypoints(reorderItemInList(waypoints, fromIndex, toIndex));
  }

  function handleAddWaypoint(coordinate: PointTuple) {
    setWaypoints([...waypoints, { coordinate, hilight: false }]);
  }

  function handleMoveWaypoint(index: number, coordinate: PointTuple) {
    const current = waypoints[index];
    setWaypoints(
      replaceItemInList(waypoints, index, { ...current, coordinate })
    );
  }

  function handleHilightWaypoint(hilightIndex: number) {
    setWaypoints(
      waypoints.map((value, index) => ({
        ...value,
        hilight: index === hilightIndex,
      }))
    );
  }

  function handleDimWaypoints(_index: number) {
    setWaypoints(waypoints.map((value) => ({ ...value, hilight: false })));
  }

  function handleDownload(_event: any) {
    const gpxContent = waypointsToGPX(
      waypoints.map(({ coordinate }) => coordinate)
    );
    const element = document.createElement("a");
    const file = new Blob([gpxContent], { type: "application/octet-stream" });

    element.style.display = "none";
    element.href = URL.createObjectURL(file);
    element.download = "route.gpx";

    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }

  const hilightedIndex = waypoints.findIndex(({ hilight }) => hilight);

  return (
    <div className="App">
      <aside className="RouteBuilderSidebar">
        <h1 className="Logo">komoot</h1>

        <h2 className="RouteBuilderSidebarTitle">Route Builder</h2>
        <DraggableList
          onRemoveItem={handleRemoveWaypoint}
          onReorderItem={handleRepositionWaypoint}
          onHoverItem={handleHilightWaypoint}
          onDimItem={handleDimWaypoints}
          list={waypoints.map((_coordinate, index) => `Waypoint ${index + 1}`)}
          hilightIndex={hilightedIndex}
        ></DraggableList>
        <button className="DownloadButton" onClick={handleDownload}>
          Download your Route
        </button>
      </aside>
      <main className="RouteBuilderMap">
        <LeafletMap
          hilightIndex={hilightedIndex}
          waypoints={waypoints.map(({ coordinate }) => coordinate)}
          onHilightWaypoint={handleHilightWaypoint}
          onDimWaypoint={handleDimWaypoints}
          onAddWaypoint={handleAddWaypoint}
          onMoveWaypoint={handleMoveWaypoint}
        />
      </main>
    </div>
  );
}

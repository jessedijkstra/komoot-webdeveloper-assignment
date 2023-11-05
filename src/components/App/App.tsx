import React, { useState } from "react";
import "./App.css";
import LeafletMap from "../Map/Map";
import DraggableList from "../DraggableList/DraggableList";
import removeIndexFromList from "../../utils/list/removeItemFromList";
import reorderItemInList from "../../utils/list/reorderItemInList";
import coordindatesToGPX from "../../utils/map/coordinatesToGPX";
import replaceItemInList from "../../utils/list/replaceItemInList";
import { Coordinate } from "../../utils/map/Coordinate";

type Waypoint = {
  coordinate: Coordinate;
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

  function handleAddWaypoint(coordinate: Coordinate) {
    setWaypoints([...waypoints, { coordinate, hilight: false }]);
  }

  function handleMoveWaypoint(index: number, coordinate: Coordinate) {
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
    const gpxContent = coordindatesToGPX(
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
    <div className="RouteBuilder">
      <h1 className="KomootLogo">komoot</h1>

      <nav className="RouteBuilderList">
        <h2 className="RouteBuilderListTitle">Route Builder</h2>
        <DraggableList
          onRemoveItem={handleRemoveWaypoint}
          onReorderItem={handleRepositionWaypoint}
          onHoverItem={handleHilightWaypoint}
          onDimItem={handleDimWaypoints}
          list={waypoints.map((_coordinate, index) => `Waypoint ${index + 1}`)}
          hilightIndex={hilightedIndex}
        ></DraggableList>
      </nav>
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
      <footer className="RouteBuilderDownload">
        <button className="RouteBuilderDownloadButton" onClick={handleDownload}>
          Download your Route
        </button>
      </footer>
    </div>
  );
}

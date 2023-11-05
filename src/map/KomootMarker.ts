import { DivIcon, Marker, PointTuple, divIcon } from "leaflet";

class KomootNumberedIcon extends DivIcon {}

export default class KomootMarker extends Marker {
  dragged = false;
  label = "";
  _icon?: HTMLImageElement;

  constructor(latlng: PointTuple, label: string, hilight: boolean) {
    super(latlng, {
      icon: new KomootNumberedIcon({
        className: "WaypointMarker",
        html: label,
      }),
      draggable: true,
    });

    this.label = label;

    this.on("dragstart", () => {
      this.dragged = true;
    });
    this.on("dragend", () => {
      this.dragged = false;
    });

    this.setHilight(hilight);
  }
  setLabel(label: string) {
    if (this.label !== label) {
      this.label = label;

      this.setIcon(
        new KomootNumberedIcon({
          className: "WaypointMarker",
          html: label,
        })
      );
    }
  }
  updateMarker(coordinate: PointTuple, label: string, hilight: boolean) {
    this.setLabel(label);
    this.setHilight(hilight);

    if (!this.dragged) {
      this.setLatLng(coordinate);
    }
  }

  setHilight(hilight: boolean) {
    this._icon?.classList.toggle("is-hilighted", hilight);
  }
}

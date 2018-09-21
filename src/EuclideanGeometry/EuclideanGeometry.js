import { pi } from "../constants";

export default class EuclideanGeometry {
  constructor(context) {
    this.context = context;
    return this;
  }

  degToRad = deg => (deg * pi) / 180;
  radToDeg = rad => (rad * 180) / pi;
  dist = ([x1, y1], [x2, y2]) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

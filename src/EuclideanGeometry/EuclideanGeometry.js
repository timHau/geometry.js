import { pi, atan2, tan, acos, asin, cos, sin, sqrt } from "../constants";

export default class EuclideanGeometry {
  constructor(context) {
    this.context = context;
    return this;
  }

  static degToRad = deg => (deg * pi) / 180;
  static radToDeg = rad => (rad * 180) / pi;

  _circleDefault = {
    color: "black",
    fill: true,
    dash: [0, 0],
    cc: false, // coutner clock wise
  }

  _lineDefault = {
    color: "black" ,
  }

  dist = ([x1, y1], [x2, y2]) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  middleBetween(a, b) {
    const alpha = this.getAlphaBetweenPoints(a,b);
    const middle = this.dist(a,b) / 2;
    return this.coordsFromDeg(alpha, middle, b);
  }

  getAlphaBetweenPoints([xa,ya], [xb,yb]) {
    const w = xa - xb;
    const h = ya - yb;
    return atan2(h, w) * 180 / pi;
  }

  coordsFromDeg(deg, len, [baseX, baseY, baseR]) {
    return [
      baseX + len * cos(deg),
      baseY + len * sin(deg),
      baseR,
    ]
  }

  halfDeg(a, b, c) {
    const angle1 = getAlphaBetweenPoints(a,b);
    const angle2 = getAlphaBetweenPoints(a,c);
    const halfDeg = (angle1 + angle2) / 2;
    return halfDeg;
  }

  sss(a,b,c) {
    const alpha = acos((b**2 + c**2 - a**2) / (2*b*c)) ;
    const beta = acos((a**2 + c**2 - b**2) / (2*a*c));
    const gamma = pi - alpha - beta;

    return [
      alpha,
      beta,
      gamma,
    ]
  }

  circle([x, y, r], o) {
    const { context, _circleDefault } = this
    const options = Object.assign(_circleDefault, o);

    context.beginPath();
    context.moveTo(x + r, y);
    context.arc(x, y, r, 0, 2 * pi);
    context.strokeStyle = options.color;
    context.setLineDash(options.dash);
    context.fillStyle = options.color;
    options.fill ? context.fill() : context.stroke();
  }

  halfCircle([x, y, r], o) {
    const { context, _circleDefault } = this
    const options = Object.assign(_circleDefault, o);

    context.beginPath();
    context.arc(x, y, r, 0, pi, options.cc);
    context.stroke();
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fill();
  }

  circumcircle([[x1, y1], [x2, y2], [x3, y3]]) {
    // i borrowed this function from: https://beta.observablehq.com/@mbostock/circumcircle
    const a2 = x1 - x2;
    const a3 = x1 - x3;
    const b2 = y1 - y2;
    const b3 = y1 - y3;
    const d1 = x1 * x1 + y1 * y1;
    const d2 = d1 - x2 * x2 - y2 * y2;
    const d3 = d1 - x3 * x3 - y3 * y3;
    const ab = (a3 * b2 - a2 * b3) * 2;
    const xa = (b2 * d3 - b3 * d2) / ab - x1;
    const ya = (a3 * d2 - a2 * d3) / ab - y1;
    if (isNaN(xa) || isNaN(ya)) return;
    return [
      x1 + xa,
      y1 + ya,
      sqrt(xa * xa + ya * ya)
    ];
  }

  pointOnCircle(center, r, deg, context) {
    const { coordsFromDeg } = this
    const cords = coordsFromDeg(deg, r, center);
    return cords;
  }

  incircleTriangle([xa, ya], [xb, yb], [xc, yc]) {
    const { dist } = this
    const a = dist([xb, yb], [xc, yc]);
    const b = dist([xa, ya], [xc, yc]);
    const c = dist([xa, ya], [xb, yb]);

    return [
      ((a * xa + b * xb + c * xc) / (c + a + b)),
      ((a * ya + b * yb + c * yc) / (c + a + b)),
    ]
  }

  radiusIncircleTriangle([xa, ya], [xb, yb], [xc, yc]) {
    const { dist } = this
    const a = dist([xb, yb], [xc, yc]);
    const b = dist([xa, ya], [xc, yc]);
    const c = dist([xa, ya], [xb, yb]);
    return 0.5 * sqrt(((b + c - a) * (c + a - b) * (a + b - c))/ (a + c + c))
  }

  line([x1,y1], [x2,y2], o) {
    const { context, _lineDefault } = this
    const options = Object.assign(_lineDefault, o);
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.strokeStyle = options.color;
    context.stroke();
  }

  lineThrough(point, deg) {
    const d = 1000;
    const p1 = coordsFromDeg(deg, d, point);
    const p2 = coordsFromDeg(deg, -d, point);
    return [ p1, p2 ];
  }

  parallelTo(a, b, d=0, context) {
    const { line, middleBetween, lineThrough, getAlphaBetweenPoints, coordsFromDeg } = this
    const middle = middleBetween(a,b);
    const angle = getAlphaBetweenPoints(a,b);
    const [ p1, p2 ] = lineThrough(coordsFromDeg(angle + 90, d, middle),angle, context);
    line(p1, p2);
  }

  tangentPoints([x, y, r], p) {
    const { dist, getAlphaBetweenPoints, radToDeg } = this
    const d = dist([x,y], p);
    const alpha = getAlphaBetweenPoints([x,y,r], p);
    const degAlpha = radToDeg(asin(r/d)) + alpha;
    const degBeta = radToDeg(asin(-r/d)) + alpha;
    return [ degAlpha, degBeta ];
  }

  tangentThroughPoint(a, p) {
    const { tangentPoints, lineThrough } = this
    const [ degAlpha, degBeta ] = tangentPoints(a, p);

    lineThrough(p, degAlpha);
    lineThrough(p, degBeta);
  }

  lengthTangent([x, y, r], p) {
    const { dist } = this
    return sqrt((dist([x, y],p) ** 2) - r ** 2) ;
  }

  triangle([x1,y1,r1], [x2, y2, r2], [x3, y3, r3]) {
    const { line, circle } = this
    line([x1,y1], [x2,y2]);
    circle([x1,y1,r1]);
    line([x2,y2], [x3,y3]);
    circle([x2,y2,r2]);
    line([x3,y3], [x1,y1]);
    circle([x3,y3,r3]);
  }

  equiliteralTriangle(a, b, dir=1) {
    const { line, dist, getAlphaBetweenPoints, coordsFromDeg } = this
    const d = dist(a,b);
    const angle = getAlphaBetweenPoints(a,b);
    const c = coordsFromDeg(dir * 60 + angle, d, b);
    line(a,c);
    line(b,c);
    return c;
  }

  centroid([[xa,ya], [xb,yb], [xc,yc]]) {
    return [
      (xa + xb + xc) / 3,
      (ya + yb + yc) / 3,
    ]
  }

  orthocenter([[x1,y1], [x2,y2], [x3,y3]], alpha, beta, gamma) {
    return [
      (x1 * tan(alpha) + x2 * tan(beta) + x3 * tan(gamma)) / (tan(alpha) + tan(beta) + tan(gamma)),
      (y1 * tan(alpha) + y2 * tan(beta) + y3 * tan(gamma)) / (tan(alpha) + tan(beta) + tan(gamma)),
    ]
  }

  altitude(a, alpha, b, beta, c, gamma, p) {
    const { coordsFromDeg, getAlphaBetweenPoints } = this
    const ar = b * cos(alpha);
    const r = coordsFromDeg(getAlphaBetweenPoints(p[1],p[0]), ar, p[0]);

    const bs = c * cos(beta);
    const s = coordsFromDeg(getAlphaBetweenPoints(p[2],p[1]), bs, p[1]);

    const ct = a * cos(gamma);
    const t = coordsFromDeg(getAlphaBetweenPoints(p[0],p[2]), ct, p[2]);

    return [ s, t, r ];
  }

  triangleCenter([xa, ya], [xb, yb], [xc, yc]) {
    const centerX = (xa + xb + xc) / 3;
    const centerY = (ya + ya + ya) / 3;
    return [ centerX, centerY ];
  }

  innerTriangle(a, b, c) {
    const { triangle, middleBetween } = this
    const p1 = middleBetween(a,b);
    const p2 = middleBetween(b,c);
    const p3 = middleBetween(c,a);
    triangle(p1,p2,p3);
  }
}

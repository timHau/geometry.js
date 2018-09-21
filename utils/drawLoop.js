export default function* drawLoop(context, options, cb) {
  const o = Object.assign({
    height: 800,
    scale: (Math.min(width, 800) - 4) / 3
  }, options);

  while(true) {

    context.clearRect(0, 0, width, o.height);
    context.save();
    context.translate(width / 2, o.height / 2);
    context.scale(o.scale, o.scale);
    context.lineWidth = 1 / o.scale;

    cb();

    context.restore();
    yield context.canvas;
  }
}

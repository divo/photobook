const canvasSketch = require('canvas-sketch');
const Canvas = require('canvas');
const fs = require('fs');

const canvas = Canvas.createCanvas();

const settings = {
  canvas,
  dimensions: [ 400, 480 ],
};

const sketch = (img) => {
  return ({ context, width, height }) => {
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);
    context.drawImage(img, 0, 0);
  };
};

const loadImage = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Canvas.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const render_sketch = async (req, res) => {
  // TODO: This seems pretty dumb, I should use a memory store.
  const img = await loadImage(req.file.path);

  canvasSketch(sketch(img), settings)
   .then(() => {
     // Once sketch is loaded & rendered, stream a PNG with node-canvas
     const out = fs.createWriteStream('output.png');
     const stream = canvas.createPNGStream();
     stream.pipe(out);
     out.on('finish', () => console.log('Done rendering'));
   });
}

module.exports = render_sketch;

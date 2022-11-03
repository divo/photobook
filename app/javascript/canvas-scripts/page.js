import Canvas from 'canvas'
import CanvasSketch from 'canvas-sketch';

const canvas = Canvas.createCanvas();

let img;

const settings = {
  dimensions: [ 600, 400 ],
};

const sketch = ({width, height, canvas}) => {
  return ({ context, width, height }) => {
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);
  };
};

const start = async function (parent) {
  settings.parent = parent;
  CanvasSketch.canvasSketch(sketch, settings)
}

document.addEventListener("turbo:load", function() {
  document.querySelectorAll('.photo-page').forEach(function(canvas_tag) {
    start(canvas_tag);
  });
});

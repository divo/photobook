import Canvas from 'canvas'
import CanvasSketch from 'canvas-sketch';

const canvas = Canvas.createCanvas();

// How to share this across multiple images?
let img;

const settings = {
  dimensions: [ 600, 400 ],
};

const sketch = ({width, height, canvas}) => {
  return ({ context, width, height }) => {
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);
  };
};

const start = async function (parent) {
  settings.parent = parent;
  CanvasSketch.canvasSketch(sketch, settings)
}

document.addEventListener("turbo:load", function() {
  document.querySelectorAll('.photo-page').forEach(function(canvas_tag) {
    console.log(canvas_tag.dataset['url']);
    start(canvas_tag);
  });
});

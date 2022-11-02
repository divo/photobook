import Canvas from 'canvas'
import CanvasSketch from 'canvas-sketch';

const canvas = Canvas.createCanvas();

let img;

const settings = {
  dimensions: [ 1048, 1048 ],
  parent: document.getElementById("canvas-test"),
};

const sketch = ({width, height, canvas}) => {
  return ({ context, width, height }) => {
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);
  };
};

const start = async () => {
  CanvasSketch.canvasSketch(sketch, settings)
}

start();



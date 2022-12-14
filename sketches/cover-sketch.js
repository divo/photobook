import { draw_text } from './draw_text.js'

export const cover_sketch = ({width, height, canvas, data}) => {
  return ({ context, width, height, data, canvas }) => {
    let scale;
    let y = 0;
    let x = 0;

    const img = data['img'];
    const name = data['name'];
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    if (is_landscape(img)) {
      scale = width / img.width;
    } else {
      scale = height / img.height; // TODO: How to layout landscape covers? Easiest way is to simply not allow it
    }

    const s_height = img.height * scale;

    context.drawImage(img, x, y, (img.width * scale), s_height);

    const fontSize = 6; //TODO: What is going on with the scaling here? What is canvas sketch doing? It's all in mm??
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'bottom';
    draw_text(name, width / 2, s_height + (( height - s_height) / 2), "normal", fontSize, context);
 };
};

const is_landscape = (image) => {
  return image.width > image.height;
};

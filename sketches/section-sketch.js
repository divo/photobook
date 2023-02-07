import { draw_text } from './draw_text.js'

export const section_sketch = ({width, height, canvas, data}) => {
  return ({ context, width, height, data, canvas }) => {
    const img = data['img'];
    const country = data['country'];

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let scale;
    let y = 30;
    let x = 30;

    scale = width / img.width;

    const s_width = img.width * scale;
    const s_height = img.height * scale;
    let clip = 40;

    // This is a hack to figure out if we are rendering to pdf
    if (scale < 1.0) {
      clip = clip / scale;
      x = x / scale;
      y = y / scale;
    }

    context.drawImage(img, x, y, img.width - clip, img.height - clip, 0, 0, (img.width * scale), s_height);

    // This is probably going to be a big pain in the ass when I go to render pdfs
    context.save();
    const textSize = context.measureText(country);
    context.fillStyle = 'white';
    const rect_width = textSize.actualBoundingBoxLeft + textSize.actualBoundingBoxRight + (40 * 2);
    const rect_height = textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent + (10 * 2);
    const rect_x = rect_width / 2;
    const rect_y = rect_height / 2;
    context.fillRect((width / 2) - rect_x, height / 2 - rect_y, rect_width, rect_height);
    context.restore();

    context.save();
    const fontSize = 12;
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.globalAlpha = 0.5
    draw_text(country, width / 2, height / 2, "oblique", fontSize, context);
    context.restore();
  };
};

const is_landscape = (image) => {
  return image.width > image.height;
};

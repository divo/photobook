import { draw_text } from './draw_text.js'

export const photo_sketch = ({width, height, canvas, data}) => {
  let safe_area = 12; // mm!
  const fontSize = 3;
  const textSafeArea = 8;
  const img = data['img'];
  const address = data['address'];

  let pos = {};

  do {
    pos = calculatePositions(safe_area, img, width, height);
    safe_area = safe_area + 5;
  } while (address != '' && isTextCropped(pos.y, pos.s_height, textSafeArea, fontSize, height))

  return ({ context, width, height, data, canvas }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.drawImage(img, pos.x, pos.y, pos.s_width, pos.s_height);

    context.fillStyle = 'rgb(126, 123, 127)';
    context.textAlign = 'center';
    context.textBaseline = 'bottom';
    draw_text(address, width / 2, pos.y + pos.s_height + textSafeArea, "oblique", fontSize, context);
  };
};

const isTextCropped = (y, s_height, textSafeArea, fontSize, height) => {
  //return (y + s_height + textSafeArea + (fontSize / 2)) > height - textSafeArea;
  return (y + s_height + textSafeArea ) > height - (textSafeArea / 2);
}

const calculatePositions = (safe_area, img, width, height) => {
  let result = {};

  if (is_landscape(img)) {
    result.scale = width / img.width;
    result.ratio = img.width / img.height;
    result.s_width = (img.width * result.scale) - (safe_area * 2)
    result.s_height = result.s_width / result.ratio;
    result.y = (height - result.s_height) / 2;
    result.x = safe_area;
  } else {
    result.scale = height / img.height;
    result.ratio = img.height / img.width;
    result.s_height = (img.height * result.scale) - (safe_area * 2)
    result.s_width = result.s_height / result.ratio;
    result.x = (width - result.s_width) / 2;
    result.y = safe_area;
  }

  return result;
}
const is_landscape = (image) => {
  return image.width > image.height;
};

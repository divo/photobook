export const draw_text = (text, x, y, fontSize, context) => {
  const transform = context.getTransform();
  const x_scale = Math.ceil(transform.a);
  const y_scale = Math.ceil(transform.d);
  context.setTransform(1, 0, 0, 1, 0, 0); // There is a bug in Cairo related to rendering text in a transformed canvas
  context.font = `oblique ${fontSize * x_scale}px Helvetica`;
  context.textAlign = 'center';
  context.fillStyle = 'rgb(126, 123, 127)';
  context.textBaseline = 'middle';

  context.fillText(text, x * x_scale, y * y_scale);
};

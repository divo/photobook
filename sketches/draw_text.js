export const draw_text = (text, x, y, fontStyle, fontSize, context) => {
  const transform = context.getTransform();
  //const x_scale = Math.ceil(transform.a);
  const x_scale = (transform.a);
  //const y_scale = Math.ceil(transform.d);
  const y_scale = (transform.d);
  context.setTransform(1, 0, 0, 1, 0, 0); // There is a bug in Cairo related to rendering text in a transformed canvas
  context.textDrawingMode = 'glyph'
  context.font = `${fontStyle} ${fontSize * x_scale}pt Helvetica`;

  context.fillText(text, x * x_scale, y * y_scale);
};

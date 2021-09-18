const APP_WIDTH = 1000;

export function getScreenWidth(padding) {
  const width = APP_WIDTH - padding;

  return width;
}

export function getScreenHeight(padding) {
  const { innerHeight } = window;
  const height = innerHeight - padding;

  return height;
}

export function getImageWidth(
  width_factor = 1,
  padding,
  image_width,
  image_height
) {
  const imageWidth = APP_WIDTH * width_factor - padding;
  //console.log("imageWidth...", imageWidth);
  return imageWidth;
}

export function getImageHeight(
  width,
  image_width,
  image_height,
  maxImageHeight = 0
) {
  const imageWidth = width; //getImageWidth(width, padding);
  let height = 0;
  let calcHeight = (image_height / image_width) * imageWidth;

  if (maxImageHeight > 0) {
    if (calcHeight > maxImageHeight) height = maxImageHeight;
    else height = calcHeight;
  } else height = calcHeight;
  console.log("height...", height);
  return height;
}

export function getFullScreenWidth(image_width, image_height) {
  const screen_height = getScreenHeight(0);

  const width = (image_width / image_height) * screen_height;
  return width;
}

export function getFullScreenHeight() {
  return getScreenHeight(0);
}

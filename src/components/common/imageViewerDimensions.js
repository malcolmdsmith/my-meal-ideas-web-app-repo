export function getImageDimensions(images, width, numColumns, padding) {
  const actualWidth = width / numColumns - padding;
  //console.log("actualWidth...", actualWidth);
  for (var image of images) {
    let calcHeight = (image.image_height / image.image_width) * actualWidth;
    //console.log("calcHeight...", calcHeight);
    image.actualWidth = actualWidth;
    image.actualHeight = calcHeight;
  }

  const maxheight = getMaximumHeight(images);
  //console.log("maxHeight...", maxheight);

  for (image of images) {
    image.actualHeight = maxheight;
  }

  return images;
}

const getMaximumHeight = (images) => {
  let maxheight = 10000;
  images.forEach((image) => {
    if (image.actualHeight < maxheight) maxheight = image.actualHeight;
  });
  return maxheight;
};

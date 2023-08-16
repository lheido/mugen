// From https://24ways.org/2010/calculating-color-contrast
// !@deprecated
export function getContrastYIQ(color: string) {
  var r = parseInt(color.slice(0, 2), 16);
  var g = parseInt(color.slice(2, 5), 16);
  var b = parseInt(color.slice(4), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // TODO: 128 is too small here.
  return yiq >= 128 ? "black" : "white";
}

// From https://24ways.org/2010/calculating-color-contrast
export function getContrast50(color: string) {
  return parseInt(color, 16) > 0xffffff / 2 ? "black" : "white";
}

export function hexToRgb(hex: string) {
  if (hex.length === 4) {
    return [
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16),
      parseInt(hex[3] + hex[3], 16),
    ];
  }
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

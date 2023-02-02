export function randomColor() {
  function r() {
    return Math.floor(Math.random() * 256);
  }

  const color = 'rgb(' + r() + ',' + r() + ',' + r() + ')';
  return color;
}

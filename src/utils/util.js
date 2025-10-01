export function numberWithCommas(x, charSpacing = ".") {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, charSpacing);
}
export function getWords(str, number) {
  if (!str) return "";
  return str.trim().split(/\s+/).slice(0, number).join(" ");
}
export function randomSlice(array) {
  if (array.length < 2) return array;

  const start = Math.floor(Math.random() * (array.length - 1));
  const end =
    Math.floor(Math.random() * (array.length - start - 1)) + start + 2;

  return array.slice(start, end);
}

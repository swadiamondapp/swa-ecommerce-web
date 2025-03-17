export function stripWhiteSpace(str) {
  return str.replace(/\s+/g, "");
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

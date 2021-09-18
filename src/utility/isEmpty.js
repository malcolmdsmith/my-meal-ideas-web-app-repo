export function isEmpty(obj) {
  for (var prop in obj) {
    return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

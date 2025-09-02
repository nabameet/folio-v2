export const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${btoa(
    String.fromCharCode(r) + String.fromCharCode(g) + String.fromCharCode(b),
  )}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

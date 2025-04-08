export default class CubicBezier {
  readonly startX: number;
  readonly startY: number;
  readonly endX: number;
  readonly endY: number;
  constructor(coordinates: [number, number, number, number]) {
    if (!Array.isArray(coordinates))
      throw new TypeError("coordinates must be an array", {
        cause: coordinates,
      });
    if (coordinates.length !== 4)
      throw new TypeError("coordinates must be an array with four items", {
        cause: { coordinates, length: coordinates.length },
      });
    const errors: {
      startXNotANumberError: TypeError;
      startXBoundError: RangeError;
      endXNotANumberError: TypeError;
      endXBoundError: RangeError;
      startYNotANumberError: TypeError;
      endYNotANumberError: TypeError;
    } = Object.create(null);
    const [startX, startY, endX, endY] = coordinates;
    if (typeof startX === "number") {
      if (startX >= 0 && startX <= 1) {
        this.startX = startX;
      } else
        errors.startXBoundError = new RangeError(
          "x coordinate must be in [0;1] range (@see https://tr.designtokens.org/format/#cubic-bezier)",
          { cause: startX },
        );
    } else
      errors.startXNotANumberError = new TypeError(
        "x coordinate must be number",
        { cause: { type: typeof startX, value: startX } },
      );
    if (typeof startY === "number") this.startY = startY;
    else
      errors.startYNotANumberError = new TypeError(
        "y coordinate must be number",
        { cause: { type: typeof startY, value: startY } },
      );

    if (typeof endX === "number") {
      if (endX >= 0 && endX <= 1) this.endX = endX;
      else
        errors.startXBoundError = new RangeError(
          "x coordinate must be in [0;1] range (@see https://tr.designtokens.org/format/#cubic-bezier)",
          { cause: endX },
        );
    } else
      errors.endXNotANumberError = new TypeError(
        "second x coordinate must be number",
        { cause: { type: typeof endX, value: endX } },
      );
    if (typeof endY === "number") this.endY = endY;
    else
      errors.endYNotANumberError = new TypeError(
        "y coordinate must be number",
        { cause: { type: typeof endY, value: endY } },
      );
  }
}

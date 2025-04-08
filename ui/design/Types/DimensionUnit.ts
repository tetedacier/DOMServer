export default class DimensionUnit extends String {
  constructor(unit: unknown) {
    super(unit);
    if (typeof unit !== "string")
      throw new TypeError('dimension unit must the either "px" or "rem"', {
        cause: unit,
      });
    if (!["px", "rem"].includes(unit))
      throw new TypeError(
        'available dimension units are restricted to "px" and "rem"',
        { cause: unit },
      );
  }
}

export default class DurationUnit extends String {
  constructor(unit: unknown) {
    super(unit);
    if (typeof unit !== "string")
      throw new TypeError('duration unit must the either "ms" or "s"', {
        cause: unit,
      });
    if (!["ms", "s"].includes(unit))
      throw new TypeError(
        'available duration units are restricted to "ms" and "s"',
        { cause: unit },
      );
  }
}

import DurationUnit from "./DurationUnit";
import DurationValue from "./DurationValue";
interface DurationProperties {
  value?: number;
  unit?: "px" | "rem";
}
export default class Duration {
  readonly value: DurationValue;
  readonly unit: DurationUnit;

  constructor(duration: DurationProperties) {
    const errors: {
      value?: unknown;
      unit?: unknown;
    } = Object.create(null);
    if (duration === null)
      throw new TypeError('given Duration can not be "null"');
    if (Array.isArray(duration))
      throw new TypeError("given Duration can not be an array", {
        cause: duration,
      });
    if (typeof duration === "object") {
      if (typeof duration.value === "number")
        try {
          this.value = new DurationValue(duration.value);
        } catch (valueError) {
          errors.value = valueError;
        }
      else throw new TypeError("given Duration value is not a number");

      try {
        this.unit = new DurationUnit(duration.unit);
      } catch (unitError) {
        errors.unit = unitError;
      }
    }
  }
}

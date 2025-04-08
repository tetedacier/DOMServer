import DimensionUnit from "./DimensionUnit";
import DimensionValue from "./DimensionValue";
interface DimensionProperties {
  value?: number;
  unit?: "px" | "rem";
}
export default class Dimension {
  readonly value: DimensionValue;
  readonly unit: DimensionUnit;

  constructor(dimension: DimensionProperties) {
    const errors: {
      value?: unknown;
      unit?: unknown;
    } = Object.create(null);
    if (dimension === null)
      throw new TypeError('given Dimension can not be "null"');
    if (Array.isArray(dimension))
      throw new TypeError("given Dimension can not be an array", {
        cause: dimension,
      });
    if (typeof dimension === "object") {
      if (typeof dimension.value === "number")
        try {
          this.value = new DimensionValue(dimension.value);
        } catch (valueError) {
          errors.value = valueError;
        }
      else throw new TypeError("given Dimension value is not a number");

      try {
        this.unit = new DimensionUnit(dimension.unit);
      } catch (unitError) {
        errors.unit = unitError;
      }
    }
  }
}

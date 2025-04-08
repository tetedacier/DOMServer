import unsupportedValuesMessageFormatter from "./utils/unsupportedValuesMessageFormatter.ts";
import Value from "./design/Value.ts";
import Name from "./design/Name.ts";
import Type from "./design/Type.ts";

export default class DesignToken {
  readonly name: Name;
  readonly type: Type;
  readonly value: Value;
  constructor(
    name: unknown,
    type: unknown,
    value: unknown,
    options?: Record<string, unknown>,
  ) {
    const errors: {
      name?: unknown;
      type?: unknown;
      value?: unknown;
    } = Object.create(null);

    try {
      this.name = new Name(name);
    } catch (nameError) {
      errors.name = nameError;
    }

    try {
      this.type = new Type(type);
    } catch (typeError) {
      errors.type = typeError;
    }

    try {
      if (typeof this.type === "string") {
        this.value = new Value(this.type, value);
      }
    } catch (valueError) {
      errors.value = valueError;
    }

    if (Object.keys(errors).length > 0) {
      throw new TypeError(
        `${((errorEntries) => {
          if (Object.keys(errors).length === 1)
            return `'${errorEntries[0]}' has unsupported value`;
          return errorEntries.reduce(unsupportedValuesMessageFormatter, "");
        })(Object.entries(errors))}`,
        { cause: errors },
      );
    }
  }
}

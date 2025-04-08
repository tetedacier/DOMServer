import typeValidator from "../utils/typeValidator.ts";

export default class Value extends String {
  constructor(type: unknown, value: unknown) {
    super(value);
    if (typeof type === "string" && typeof typeValidator[type] === "function") {
      typeValidator[type](value);
    }
  }
}

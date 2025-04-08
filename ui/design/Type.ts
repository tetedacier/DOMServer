import typeValidator from "../utils/typeValidator.ts";
/**
 * https://tr.designtokens.org/format/#type
 * https://tr.designtokens.org/format/#type-0
 */
export default class Type extends String {
  constructor(type: unknown) {
    super(type);

    if (typeof type !== "string")
      throw new TypeError('"type" must be of type string', {
        cause: { type: typeof type, value: type },
      });

    if (!Object.keys(typeValidator).includes(type))
      throw new TypeError('"type" is not currently handled', {
        cause: { type },
      });
  }
}

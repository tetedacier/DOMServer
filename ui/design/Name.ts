export default class Name extends String {
  constructor(name: unknown) {
    super(name);
    if (typeof name === "string") {
      const errors: {
        dollarPrefix?: TypeError;
        aliasAccessor?: TypeError;
      } = Object.create(null);
      if (name.startsWith("$")) {
        errors.dollarPrefix = new TypeError(
          "DesignToken[Name] can not be prefixed with the dollar sign",
          { cause: name },
        );
      }
      if (/[{}.]/.test(name)) {
        errors.aliasAccessor = new TypeError(
          "DesignToken[Name] can not contains alias reserved accessor",
          { cause: name },
        );
      }
      if (Object.keys(errors).length > 0) {
        throw new TypeError(
          "Given `token` `name` does not follow `designtokens` [character restrictions rule](https://tr.designtokens.org/format/#character-restrictions)",
          {
            cause: errors,
          },
        );
      }
    }
  }
}

const FontWeighMapping = {
  "100": ["thin", "hairline"],
  "200": ["extra-light", "ultra-light"],
  "300": ["light"],
  "400": ["normal", "regular", "book"],
  "500": ["medium"],
  "600": ["semi-bold", "demi-bold"],
  "700": ["bold"],
  "800": ["extra-bold", "ultra-bold"],
  "900": ["black", "heavy"],
  "950": ["extra-black", "ultra-black"],
};

export default class FontWeight<FontWeightValue> {
  readonly $type = "fontWeight";
  readonly $value: FontWeightValue;
  constructor(fontWeight: FontWeightValue) {
    const errors: {
      outOfRangeNumericError?: RangeError;
      undefinedKeyError?: SyntaxError;
      unsupportedKeyError?: TypeError;
    } = Object.create(null);
    switch (typeof fontWeight) {
      case "number": {
        if (fontWeight >= 1 && fontWeight <= 1000) {
          this.$value = fontWeight;
        } else {
          errors.outOfRangeNumericError = RangeError(
            "numeric fontWeight value must be included in interval `[1;1000]`",
            { cause: fontWeight },
          );
        }
        break;
      }
      case "string": {
        const fontWeightMapping = Object.entries(FontWeighMapping);
        const higherBound = fontWeightMapping.length;
        let fontWeigthFound = false;
        for (
          let numericValueIndex = 0;
          numericValueIndex < higherBound;
          numericValueIndex++
        ) {
          if (fontWeightMapping[numericValueIndex][1].includes(fontWeight)) {
            fontWeigthFound = true;
            break;
          }
        }
        if (fontWeigthFound) this.$value = fontWeight;
        else {
          errors.undefinedKeyError = new SyntaxError(
            "fontWeight alias not found (@see https://tr.designtokens.org/format/#font-weight)",
            { cause: fontWeight },
          );
        }
        break;
      }
      default: {
        errors.unsupportedKeyError = new TypeError(
          "given fontWeight type is neither a number or a string",
          { cause: { value: fontWeight, type: typeof fontWeight } },
        );
      }
    }
    if (Object.keys(errors).length > 0) {
      throw new TypeError("cannot initiate fontWeight", {
        cause: { ...errors, givenValue: fontWeight },
      });
    }
  }
}

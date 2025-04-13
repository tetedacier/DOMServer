// Base designtokens validator and builder should rely on [postcss implementation](https://github.com/postcss)

export default Object.freeze({
  color: (value: unknown) => {
    // see postcss project
  },
  duration: (value: unknown) => {
    // see postcss project
  },
  dimension: (value: unknown) => {
    // see postcss project
  },
  fontFamily: (value: unknown) => {
    // see postcss project
  },
  fontWeight: (value: unknown) => {},
  number: (value: unknown) => {},
  // this is composite
  shadow: (value: unknown) => {},
});

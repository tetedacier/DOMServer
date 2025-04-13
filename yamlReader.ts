import { parse } from "jsr:@std/yaml";
const textDecoder = new TextDecoder();
/**
 * Some information about basic yaml format can be found at:
 * - [YAML Multiline](https://yaml-multiline.info/)
 */

Promise.allSettled([
  Deno.readFile("./minimal.tokens.yml"),
  Deno.readFile(".tokens.yml"),
  Deno.readFile("./composite.tokens.yml"),
]).then(([minimalTokens, tokens, compositeTokens]) => {
  const fileErrors: {
    minimalTokens?: Error;
    tokens?: Error;
    compositeTokens?: Error;
  } = Object.create(null);

  [
    { minimalTokens },
    { tokens },
    { compositeTokens },
  ].forEach(
    (
      fileStream,
    ) => {
      const fileReference = Object.keys(fileStream)[0] as
        | "minimalTokens"
        | "tokens"
        | "compositeTokens";
      const fileResolver = fileStream[fileReference] as PromiseSettledResult<
        Uint8Array<ArrayBuffer>
      >;
      if (fileResolver.status === "rejected") {
        fileErrors[fileReference] = new Error("cannot read content", {
          cause: {
            reason: fileResolver.reason,
            source: fileReference,
          },
        });
      } else {
        console.log(parse(textDecoder.decode(fileResolver.value)));
      }
    },
  );
});

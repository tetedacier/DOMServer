import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import DesignToken from "./DesignTokens.ts";

describe("DesignToken object", () => {
  it("can not be created  with a dollar prefixed name", () => {
    try {
      new DesignToken("$test", "color", "#abcdef");
    } catch (error) {
      expect(Object.keys(error?.cause?.name?.cause).includes("dollarPrefix"))
        .toBe(
          true,
        );
    }
  });

  it("is created when definition is complete", () => {
    const token = new DesignToken("test", "color", "#abcdef");

    expect(token.name.toString()).toBe("test");
  });
});

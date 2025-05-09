import { parse } from "jsr:@std/yaml";
const textDecoder = new TextDecoder();


Deno.readFile("./vendors/keycloak/openapi.yaml").then((data) => {
  const yaml = textDecoder.decode(data);
  console.log(JSON.stringify(parse(yaml)));
});

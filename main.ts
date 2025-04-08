import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";

const test = new DOMParser();
const document = test.parseFromString(
  "<h1>title</h1><p>content</p><p>details</p>",
  "text/html",
);
console.log(document.childNodes[1].querySelectorAll("p")[1].innerHTML);

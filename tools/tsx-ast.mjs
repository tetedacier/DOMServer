import * as ts from "npm:typescript";
import fs from "node:fs";

// Nom du fichier (peut être un nom fictif si vous analysez une chaîne)
const fileName = "./application/client/src/App.tsx";

// import components stream
const tsxCode = fs.readFileSync(fileName, {
  encoding: "utf-8",
});

// Créer le SourceFile (l'AST)
const sourceFile = ts.createSourceFile(
  fileName,
  tsxCode,
  ts.ScriptTarget.Latest, // Cible ECMAScript
  true, // Conserver le texte du fichier
);

// L'objet sourceFile contient l'AST.
// Vous pouvez parcourir l'AST en utilisant sourceFile.forEachChild ou ts.forEachChild
// pour inspecter les nœuds.

// Exemple simple de parcours (affichage des types de nœuds)
export function printNodeKind(node, indent = 0) {
  console.log(`${" ".repeat(indent)}: ${ts.SyntaxKind[node.kind]}`);
  ts.forEachChild(node, (child) => {
    printNodeKind(child, indent + 2);
    if (child.kind === ts.SyntaxKind.StringLiteral) {
      // console.log(Object.keys(child));
      console.log(`${" ".repeat(indent + 2)}:= ${child.text}`);
    }
    // return
  });
}

// printNodeKind(sourceFile);

export function extractImport(node) {
  const imports = [];
  ts.forEachChild(node, (child) => {
    if (child.kind === ts.SyntaxKind.ImportDeclaration) {
      printNodeKind(child);
      imports.push(Object.keys(child));
      //.importClause
    }
    // extractImport(child);
  });

  return imports;
}

// console.log(extractImport(sourceFile));
extractImport(sourceFile);

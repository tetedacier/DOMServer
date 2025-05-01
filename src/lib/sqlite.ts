import { DatabaseSync } from "node:sqlite";
import {PASSWORD_SECRET} from '../conf.ts';
import { createHmac } from 'node:crypto';

const db = new DatabaseSync("infra.db");

db.exec(
  `
	CREATE TABLE IF NOT EXISTS people (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  username TEXT,
	  password TEXT
	);
  `,
);

[
  ["user1", "password1"],
  ["user2", "password2"]
].forEach(
    (userDescription) => {
    const [username, clearPassword] = userDescription;
    console.log(userDescription);

    const enCryptedPassword = createHmac('sha256', PASSWORD_SECRET)
                   .update(clearPassword)
                   .digest('base64');

    db.prepare(
      `
	INSERT INTO people (username, password) VALUES (?, ?);
      `,
    ).run(username, enCryptedPassword);
  }
);
const rows = db.prepare("SELECT * FROM people").all();
console.log("People:");
for (const row of rows) {
  console.log(row);
}
db.close();

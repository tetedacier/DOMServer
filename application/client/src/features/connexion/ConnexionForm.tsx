import { useState } from "react";
import { Connexion } from "../../services/socket.ts";

export default function ConnexionForm(
  props: { setConnexion: (value: unknown) => void },
) {
  const [errors, setErrors] = useState({});
  return (
    <form
      action="/message"
      method="POST"
      onSubmit={(event: FormEvent) => {
        const validationErrors: {
          username: TypeError;
          password: TypeError;
        } = Object.create(null);
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        if (typeof username !== "string") {
          validationErrors.username = new TypeError(
            "username must be a string",
            { cause: username },
          );
        }
        if (typeof password !== "string") {
          validationErrors.password = new TypeError(
            "password must be a string",
            { cause: password },
          );
        }
        if (Object.keys(validationErrors).length === 0) {
          props.setConnexion(new Connexion(username, password));
          // const connexion = new Connexion(username, password);
          // connexion.sendMessage("logged");
        } else {
          setErrors(validationErrors);
        }
      }}
    >
      {Object.keys(errors).length > 0 && (
        <details>
          <summary>
            <pre>- {Object.values(errors).map((value:unknown) => value.message).join("\n- ")}</pre>
          </summary>
        </details>
      )}
      <label htmlFor="username">username</label>
      <input type="text" id="username" name="username" defaultValue="user1" />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        defaultValue="password1"
      />
      <button type="submit">login</button>
    </form>
  );
}

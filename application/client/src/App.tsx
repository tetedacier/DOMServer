import "./App.css";
import { FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import sendMessage from "./services/socket.ts";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img src="/vite-deno.svg" alt="Vite with Deno" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <form
          action="/message"
          method="POST"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();

            const formData = new FormData(event.target as HTMLFormElement);
            const message = formData.get("message");
            if (typeof message === "string") {
              sendMessage(message);
            }
          }}
        >
          <details>
            <summary>
              <label htmlFor="message[0]">
                message:
              </label>
            </summary>

            <textarea id="message[0]" name="message" rows={5} cols={80}>
            </textarea>
            <hr />
            <button type="submit">test</button>
          </details>
        </form>
      </div>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

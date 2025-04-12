// Create WebSocket connection.
import { jwtDecode } from "jwt-decode";
if (sessionStorage.getItem("liveToken") === null) {
  // here we should negaciate with the server to retrieve a
  // real authenfication token
  sessionStorage.setItem("liveToken", crypto.randomUUID());
}

// First, get authentication token
async function authenticate(username: string, password: string) {
  const response = await fetch("http://localhost:3000/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }
  const { token } = await response.json();
  console.log(token);
  return token;
}
export class Connexion {
  #socket: WebSocket;
  sendMessage(message: string) {
    console.log(message);
    this.#socket.send(message);
  }
  constructor(username: string, password: string) {
    this.#socket = new WebSocket(
      `ws://localhost:3000/ws/${sessionStorage.getItem("liveToken")}`,
    );

    this.#socket.onopen = async () => {
      try {
        let token;
        if (
          sessionStorage.getItem("token") === null ||
          sessionStorage.getItem("exp") * 1000 < Date.now()
        ) {
          token = await authenticate(username, password);
          const { iss, username: tokenUserName, exp, iat } = jwtDecode(token);

          sessionStorage.setItem("iss", iss);
          sessionStorage.setItem("username", tokenUserName);
          sessionStorage.setItem("exp", exp);
          sessionStorage.setItem("iat", iat);
          sessionStorage.setItem("token", token);
        } else {
          token = sessionStorage.getItem("token");
        }

        // Send authentication message
        this.#socket.send(JSON.stringify({
          type: "auth",
          token,
        }));
      } catch (err) {
        console.error("Authentication failed:", err);
        this.#socket.close();
      }
    };

    this.#socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.type === "auth_success") {
        console.log("Successfully authenticated!");

        // Start sending messages
        this.#socket.send(JSON.stringify({
          type: "message",
          content: "Hello, authenticated world!",
        }));
      } else if (data.type === "error") {
        console.error("Error:", data.message);
      } else {
        console.log("Received message:", data);
      }
    };

    this.#socket.onclose = () => {
      console.log("Connection closed");
    };

    this.#socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }
}

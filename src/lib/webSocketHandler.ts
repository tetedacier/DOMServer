import { verifyToken } from "./jwt.ts";
// Store connected clients
const clients = new Map<string, WebSocket>();

export default function webSocketHandler(ws: WebSocket) {
  ws.onopen = () => {
    console.log("Client connected");
  };

  ws.onmessage = async (message) => {
    try {
      const data = JSON.parse(message.data);
      console.log({ message, data });

      // Handle authentication
      if (data.type === "auth") {
        const token = data.token;
        const payload = await verifyToken(token);

        if (!payload) {
          ws.send(JSON.stringify({ type: "error", message: "Invalid token" }));
          ws.close();
          return;
        }

        // Store authenticated client
        clients.set(payload.username, ws);
        ws.send(JSON.stringify({ type: "auth_success" }));
        return;
      }

      // Handle other messages
      // Make sure client is authenticated
      const authenticatedUser = Array.from(clients.entries()).find(
        ([_, client]) => client === ws,
      );

      if (!authenticatedUser) {
        ws.send(
          JSON.stringify({ type: "error", message: "Not authenticated" }),
        );
        return;
      }

      // Handle authenticated messages
      console.log(
        `Received message from ${authenticatedUser[0]}: ${message.data}`,
      );

      // Broadcast message to all authenticated clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.data);
        }
      });
    } catch (err) {
      console.error("Error handling message:", err);
    }
  };

  ws.onclose = () => {
    // Remove client from authenticated clients
    for (const [username, client] of clients.entries()) {
      if (client === ws) {
        clients.delete(username);
        break;
      }
    }
    console.log("Client disconnected");
  };
}

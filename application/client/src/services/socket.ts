// Create WebSocket connection.

if (sessionStorage.getItem("token") === null) {
  // here we should negaciate with the server to retrieve a
  // real authenfication token
  sessionStorage.setItem("token", crypto.randomUUID());
}
const socket = new WebSocket(
  `ws://localhost:3000/${sessionStorage.getItem("token")}`,
);
// Connection opened
socket.addEventListener("open", (event) => {
  console.log(event);
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
export default function sendMessage(message: string) {
  console.log(message);
  socket.send(message);
}

import authenticationHandler from "./lib/authenticationHandler.ts";
import webSocketHandler from "./lib/webSocketHandler.ts";

function setCorsHeaders(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
  );
  headers.set(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS, GET, PUT, DELETE",
  );
}

Deno.serve({ port: 3000, hostname: "127.0.0.1" }, async (req) => {
  const url = new URL(req.url);
  if (req.method === "OPTIONS") {
    const response = new Response();
    setCorsHeaders(response.headers);
    return response;
  }

  if (url.pathname === "/auth") {
    const response = await authenticationHandler(req);
    setCorsHeaders(response.headers);
    return response;
  } else if (url.pathname.startsWith("/ws/")) {
    const { socket, response } = Deno.upgradeWebSocket(
      req,
    );
    webSocketHandler(socket as unknown as WebSocket);
    return response;
  } else {
    return new Response(
      "Not found",
      { status: 404 },
    );
  }

  // if (req.headers.get("upgrade") != "websocket") {
  //   return new Response(null, { status: 501 });
  // }

  // const { socket, response } = Deno.upgradeWebSocket(req);
  // socket.addEventListener("open", () => {
  //   const url = new URL(req.url);
  //   console.log(
  //     `client[?] connected on hook ${url.pathname.replace(/^\//, "")}`,
  //   );
  // });

  // socket.addEventListener("close", () => {
  //   const url = new URL(req.url);
  //   console.log(
  //     `client[?] disconnected from hook ${url.pathname.replace(/^\//, "")}`,
  //   );
  // });

  // socket.addEventListener("message", (event) => {
  //   console.log(event.data);
  //   if (event.data === "ping") {
  //     socket.send("pong");
  //   }
  // });

  // return response;
});

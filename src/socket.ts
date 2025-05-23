import authenticationHandler from "./lib/authenticationHandler.ts";
import webSocketHandler from "./lib/webSocketHandler.ts";
import roomsHandler from "./lib/roomsHandler.ts";

/**
 * Adapted from Claude sonnet 3.5 reponse to the following prompt
 * @prompt How setup authentication support in deno socket server project ?
 * More information available on:
 * - deno documentation
 * - [Using WebSockets with Deno - LogRocket Blog](https://blog.logrocket.com/using-websockets-with-deno/)
 * - [WebSocket() - Les API Web | MDN](https://developer.mozilla.org/fr/docs/Web/API/WebSocket/WebSocket)
 * - [RFC-6455 - The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
 */
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
  } else if(url.pathname === "/room") {

    const response = await roomsHandler(req);
      setCorsHeaders(response.headers);
      return response;
  } else if(url.pathname.startsWith("/room")) {

  }else {
    return new Response(
      "Not found",
      { status: 404 },
    );
  }
});

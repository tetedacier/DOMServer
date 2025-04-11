const knownUsers = {
  "ae310376-9595-4f4a-bc28-3c75e4b5c290": {},
};
Deno.serve({ port: 3000, hostname: "127.0.0.1" }, (req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    const url = new URL(req.url);
    console.log(
      `client[?] connected on hook ${url.pathname.replace(/^\//, "")}`,
    );
  });

  socket.addEventListener("close", () => {
    const url = new URL(req.url);
    console.log(
      `client[?] disconnected from hook ${url.pathname.replace(/^\//, "")}`,
    );
  });

  socket.addEventListener("message", (event) => {
    console.log(event.data);
    if (event.data === "ping") {
      socket.send("pong");
    }
  });

  return response;
});

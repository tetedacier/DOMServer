function streamHandler(req: Request) {
  let timer: number;
  const body = new ReadableStream({
    start(controller) {
      timer = setInterval(() => {
        controller.enqueue("Hello, World!\n");
      }, 1000);
    },
    cancel() {
      clearInterval(timer);
    },
  });
  return new Response(body.pipeThrough(new TextEncoderStream()), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
Deno.serve({ port: 3000, hostname: "127.0.0.1" }, async (req) => {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  // basic routing
  if (url.pathname === "/stream") return streamHandler(req);

  console.log("Query parameters:", url.searchParams);

  console.log("Headers:", req.headers);

  if (req.body) {
    try {
      const body = await req.text();
      console.log("Body:", body);
    } catch (error) {
      console.group("decoding body stream failed");
      console.error(error);
      console.groupEnd();
    }
  }
  return new Response("Hello, World!");
});

export default function roomsHandler(
  req: Request,
): Promise<Response> {
  if (req.method === "GET") {

  }

  return new Response("Method not allowed", { status: 405 });
}

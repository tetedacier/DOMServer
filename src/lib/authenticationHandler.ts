import { generateToken } from "./jwt.ts";

// In-memory user database (replace with actual database in production)
const users = new Map([
  ["user1", "password1"],
  ["user2", "password2"],
]);

export default async function authenticationHandler(
  req: Request,
): Promise<Response> {
  console.log(req.method);
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { username, password } = body;

    if (!users.has(username) || users.get(username) !== password) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const token = await generateToken(username);
    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response("Invalid request", { status: 400 });
  }
}

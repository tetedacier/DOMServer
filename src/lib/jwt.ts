import {
  JWTPayload,
  // JWTPayload,
  jwtVerify,
  SignJWT,
} from "jose";
import { JWT_SECRET } from "../conf.ts";
interface AuthenticatedPayload {
  iss: string;
  usename: string;
  // epoch related time in seconds where toeken expires
  exp: string;
}
// Generate JWT token
export async function generateToken(username: string): Promise<string> {
  const payload = {
    iss: "deno-websocket-server",
    username: username,
    exp: new Date().getTime() + 60 * 60 * 1000, // 1 hour expiration
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(Uint8Array.from(JWT_SECRET));
}
type AuthenticatedJWTPayload = JWTPayload & AuthenticatedPayload;
// Verify JWT token
export async function verifyToken(
  token: string,
): Promise<AuthenticatedJWTPayload> {
  try {
    const { payload } = await jwtVerify(
      token,
      Uint8Array.from(JWT_SECRET),
    ) as AuthenticatedJWTPayload;
    console.log("JWT is valid:", payload);
    return payload;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

/**
  TODO:
  - A test to ensure non local environment provide all env keys
  - A procedure to handle SECRET update
*/
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
export const PASSWORD_SECRET = process.env.PASSWORD_SECRET || "your-password-secret-key";

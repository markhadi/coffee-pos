import jwt, { SignOptions, VerifyErrors } from "jsonwebtoken";

export type TokenType = "access" | "refresh";
const tokenSecret = (type: TokenType) =>
  type === "access"
    ? process.env.JWT_ACCESS_TOKEN_SECRET!
    : process.env.JWT_REFRESH_TOKEN_SECRET!;
const tokenExpiresIn = (type: TokenType) =>
  type === "access" ? process.env.JWT_EXPIRES_IN : "1d";

export function generateToken(
  payload: string | Buffer | object,
  type: TokenType,
  options?: SignOptions
): string {
  return jwt.sign(payload, tokenSecret(type), {
    ...options,
    expiresIn: tokenExpiresIn(type),
  });
}

export async function verifyToken(
  token: string,
  type: TokenType
): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      tokenSecret(type),
      (error: VerifyErrors | null, decoded: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      }
    );
  });
}

export function generateRoleMessage(roles: readonly string[]): string {
  if (roles.length === 1) {
    throw new Error("Roles array must contain at least two elements");
  }

  if (roles.length === 2) {
    return `Select either ${roles[0]} or ${roles[1]}`;
  }

  const lastRole = roles[roles.length - 1];
  const initialRoles = roles.slice(0, -1);
  return `Select either ${initialRoles.join(", ")} or ${lastRole}`;
}

export const minimumString = (n: number, field: string) =>
  `${field} at least ${n} characters long`;
export const maximumString = (n: number, field: string) =>
  `${field} must be ${n} characters at most`;
export const nonnegative = (field: string) =>
  `${field} must be greather than -1`;
export function roleMessage(roles: readonly string[]): string {
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

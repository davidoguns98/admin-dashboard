// utils/jwt.ts
export interface MockJWTPayload {
  role: "admin" | "editor";
  exp: number;
}

export function createMockJWT(payload: MockJWTPayload): string {
  const base64Payload = btoa(JSON.stringify(payload));
  // Header and Signature are mocked
  return `mockHeader.${base64Payload}.mockSignature`;
}

export function parseMockJWT(token: string): MockJWTPayload | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decoded = JSON.parse(atob(payloadBase64));
    return decoded;
  } catch {
    return null;
  }
}

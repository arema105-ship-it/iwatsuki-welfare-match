/**
 * サーバーサイド専用。クライアントから import しないこと。
 */
export function verifyPassword(input: string): boolean {
  const expected = process.env.DEMO_PASSWORD;
  if (!expected) return false;
  if (!input || typeof input !== 'string') return false;
  return input === expected;
}

export function isPasswordConfigured(): boolean {
  return Boolean(process.env.DEMO_PASSWORD);
}

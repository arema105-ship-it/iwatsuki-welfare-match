import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isPasswordConfigured, verifyPassword } from '../lib/verify-password.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isPasswordConfigured()) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { password } = req.body ?? {};
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password required' });
  }

  if (verifyPassword(password)) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Invalid password' });
}

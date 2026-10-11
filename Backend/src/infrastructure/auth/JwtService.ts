import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  userId: string;
  role: string;
  linkedId?: string;
}

export class JwtService {
  private static getSecret(): string {
    return env.JWT_SECRET;
  }

  public static generateToken(userId: string, role: string, linkedId?: string): string {
    const payload: JwtPayload = { userId, role, ...(linkedId ? { linkedId } : {}) };
    return jwt.sign(payload, this.getSecret(), { expiresIn: '1d' });
  }

  public static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.getSecret()) as JwtPayload;
  }
}

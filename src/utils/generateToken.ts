import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

const generateToken = (userId: string, expirationMilliseconds: number): string => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  if (!Number.isFinite(expirationMilliseconds) || expirationMilliseconds <= 0) {
    throw new Error('JWT expiration must be a positive duration');
  }

  const token = jwt.sign(
    payload, 
    secret, 
    {
      expiresIn: expirationMilliseconds / 1000 as SignOptions['expiresIn'],
    }
  );

  return token;
};

export default generateToken;

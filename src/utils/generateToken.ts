import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRATION || '1d'; // Default to 1 day if not set

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  if (!expiresIn) {
    throw new Error('JWT_EXPIRATION is not configured');
  }

  const token = jwt.sign(
    payload, 
    secret, 
    {
      expiresIn: expiresIn as SignOptions['expiresIn'],
    }
  );

  return token;
};

export default generateToken;

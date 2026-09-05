import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { Response } from 'express';
import { parseDuration } from '@/utils/dateTimeConverter.js';

const generateToken = (userId: string, res: Response): string => {
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

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'strict',
    maxAge: parseDuration(expiresIn), // Convert expiresIn to milliseconds
  });

  return token;
};

export default generateToken;

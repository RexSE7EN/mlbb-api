import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/config/db.js';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    accountStatus: string;
  };
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Access token missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      omit:{
        password: true,
      }
    });

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'User invalid or not found' });
    }

    const accountStatus = user.accountStatus;
  
    if (accountStatus === 'SUSPENDED') {
      return res.status(403).json({ status: 'error', message: 'Your account is suspended. Please contact support.' });
    } else if (accountStatus === 'INACTIVE') {
      return res.status(403).json({ status: 'error', message: 'Your account is inactive. Please contact support.' });
    }

    // Check if token is expired based on the token's expiration time
    const userToken = await prisma.userAPIToken.findFirst({
      where: {
        userId: user.id,
        token,
      },
    });

    if (!userToken || userToken.expiresAt < new Date()) {
      return res.status(401).json({ status: 'error', message: 'Token invalid or expired. Please login with credentials to get new token.' });
    }

    req.user = user; // Attach user to request object
    next();

  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Token validation failed. Not authorized to access this route.' });
  }
}

const authorizedRoles = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Not authorized to access this route.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: 'You do not have permission to perform this action.' });
    }

    next();
  }
}

export { 
  authMiddleware,
  authorizedRoles
};

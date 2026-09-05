import { Request, Response } from 'express';
import { prisma } from '@/config/db.js';
import bcrypt from 'bcryptjs';
import generateToken  from '@/utils/generateToken.js';
import { parseDuration } from '@/utils/dateTimeConverter.js';

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password.' });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists. Please check your email.' });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(27);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  });

  return res.status(201).json({ status: 'success', message: 'User registered successfully', 
      data: {
        user : {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
     }
   });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Generate JWT token
  const token = generateToken(user.id, res);
  const expiresIn = process.env.JWT_EXPIRATION || '1d';

  const existingToken = await prisma.userAPIToken.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!existingToken) {
    // Log token in db
    const tokenLog = await prisma.userAPIToken.create({
      data: {
        userId: user.id,
        token: token,
        expiresAt: new Date(Date.now() + parseDuration(expiresIn)),
      }
    });
  }
  else {
    const tokenLog = await prisma.userAPIToken.update({
      where: {
        id: existingToken.id,
      },
      data: {
        token: token,
        expiresAt: new Date(Date.now() + parseDuration(expiresIn)),
      }
    });
  }

  return res.status(200).json({ status: 'success', message: 'User login successful', 
    data: { 
      user : {
        id: user.id, 
        name: user.name, 
        email: user.email,
      },
      token,
    } 
  });
};

export {
  registerUser,
  loginUser,
};
import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
  const body = req.body;

  res.json({
    message: 'Register user endpoint',
  });
};

export {
  registerUser,
};
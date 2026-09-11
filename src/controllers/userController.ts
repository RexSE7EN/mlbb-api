import { prisma } from "@/config/db.js";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  const { id }  = req.params;

  let users;

  if (id) {
    users = await prisma.user.findUnique({
      where: {
        id: id.toString(),
      },
      omit: {
        password: true
      }
    });
  } else {
    users = await prisma.user.findMany({
      omit: {
        password: true
      }
    });
  }

  if (!users) {
    return res.status(404).json({ status: "error", message: "Users not found" });
  }

  return res.status(200).json({ status: "success", message: "Got user(s) successfully",
    data : users
   });
}

export {
  getUsers,
}
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["warn", "error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("[Prisma] Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("[Prisma] Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
}

export { prisma, connectDB, disconnectDB };

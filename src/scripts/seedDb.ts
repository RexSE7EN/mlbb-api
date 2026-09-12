import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { prisma, connectDB, disconnectDB } from "@/config/db.js";
import bcrypt from 'bcryptjs';

const DEFAULT_NAME = "Admin User";
const DEFAULT_EMAIL = "admin@example.com";

function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("one number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("one special character");
  }

  return errors;
}

async function askPassword(
  rl: ReturnType<typeof createInterface>
): Promise<string> {
  while (true) {
    const password = await rl.question("Enter the password: ");

    const errors = validatePassword(password);

    if (errors.length === 0) {
      const confirmation = await rl.question(
        "Confirm the password: "
      );

      if (password === confirmation) {
        return password;
      }

      console.log("Passwords do not match. Please try again.\n");
      continue;
    }

    console.log(
      `Password must contain ${errors.join(", ")}.\n`
    );
  }
}

async function seedDb(): Promise<void> {
  await connectDB();

  const rl = createInterface({
    input,
    output,
  });

  try {
    const adminUser = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
      select: { id: true },
    });

    if (adminUser) {
      console.log("Admin user already exists. Skipping seeding.");
      return;
    }

    const nameInput = await rl.question(
      `Enter the name of the admin user [${DEFAULT_NAME}]: `
    );

    const adminName = nameInput.trim() || DEFAULT_NAME;

    const emailInput = await rl.question(
      `Enter the email of the admin user [${DEFAULT_EMAIL}]: `
    );

    const adminEmail = emailInput.trim() || DEFAULT_EMAIL;

    const adminPassword = await askPassword(rl);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: adminEmail,
      },
    });
    if (userExists) {
      console.log('User already exists. Please check your email.');
      return;
    }

    // Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create the admin user
    const user = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      }
    });

    if (!user) {
      console.error("Failed to create admin user. Please check the database connection and try again.");
      return;
    }

    console.log(`Admin user created with ID: ${user.id}`);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("\nProcess interrupted or error occurred while seeding the database:");
    process.exitCode = 1;
  } finally {
    rl.close();
    await disconnectDB();
  }
}

await seedDb();


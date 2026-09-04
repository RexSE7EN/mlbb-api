## Project Structure

The current project structure is:

mlbb-api/
├── src/
│   ├── config/          # Database, environment, and third-party service setups
│   │   └── db.ts
│   ├── controllers/     # Request handlers and business logic
│   │   ├── authController.ts
│   │   ├── heroController.ts
│   ├── middleware/      # Custom Express middleware
│   ├── routes/          # Express route definitions
│   │   ├── authRoutes.ts
│   │   ├── heroesRoutes.ts
│   │   ├── itemsRoutes.ts
│   │   └── nightlyRoutes.ts
│   └── index.ts         # Application entry point and server bootstrap
├── prisma/              # Prisma schema and database migrations
├── package.json
├── .gitignore
└── tsconfig.json
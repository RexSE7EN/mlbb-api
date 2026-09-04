# MLBB-API (Under Development)

MLBB-API is a TypeScript and Express API for Mobile Legends: Bang Bang data.

## Features

- Hero data endpoints
- Nightly API endpoints for development work
- PostgreSQL database access through Prisma

## Requirements

- Node.js
- npm
- A PostgreSQL-compatible database

## Installation

```bash
git clone https://github.com/RexSE7EN/mlbb-api.git
cd mlbb-api
npm install
```

## Environment Variables

Copy `.env.example` and name the copy `.env`:

```bash
cp .env.example .env
```

Then update the values in `.env` for your environment. `DATABASE_URL` for app and `DATABASE_URL_UNPOOLED` for Prisma is required. Put `PORT` value and start developing.

## Database Setup

Apply the existing Prisma migrations with:

```bash
npx prisma migrate deploy
```

To create a migration during development:

```bash
npx prisma migrate dev --name <describe-your-change>
```

## Running the API

Start the development server:

```bash
npm run dev
```

For a normal start without file watching:

```bash
npm start
```

The API is available at `http://localhost:[your-port]` by default.

## Validation

Run the TypeScript check with:

```bash
npm run check
```

## Project Status

This project is under active development. The `dev` branch is used for ongoing work and pull requests.

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Versioning](VERSIONING.md)
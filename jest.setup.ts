// jest.setup.ts

import "reflect-metadata";

process.env.NODE_ENV = "test";
process.env.PORT = "0"; // Use random port if needed

// Optional: load environment variables from `.env.test`
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

// Optional: suppress Prisma client warnings (e.g., about no .env)
process.env.PRISMA_HIDE_UPDATE_MESSAGE = "true";

// Optionally reset modules between tests
jest.resetModules();

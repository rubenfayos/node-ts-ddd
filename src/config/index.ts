import dotenv from "dotenv";

dotenv.config();

export type APP_ENV_TYPES = "development" | "test" | "production";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
abstract class Config {
  static readonly APP_PORT = process.env.APP_PORT || 3000;
  static readonly APP_ENV: APP_ENV_TYPES = "development";
  static readonly DB_HOST = process.env.DB_HOST || "127.0.0.1";
  static readonly DB_USER = process.env.DB_USER || "postgres";
  static readonly DB_PASS = process.env.DB_PASS || "postgres";
  static readonly DB_DATABASE = process.env.DB_DATABASE || "ddd";
  static readonly DB_DATABASE_TEST = process.env.DB_DATABASE_TEST || "ddd_test";
  static readonly DB_PORT = process.env.DB_PORT || 5432;
  static readonly SENTRY_DSN = process.env.SENTRY_DSN || "";
  static readonly JWT_SECRET = process.env.JWT_SECRET || "";
  static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
  static readonly RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
  static readonly RABBITMQ_USER = process.env.RABBITMQ_USER || "guest";
  static readonly RABBITMQ_PASS = process.env.RABBITMQ_PASS || "guest";
  static readonly RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || "default_queue";
}

export default Config;

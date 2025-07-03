import crypto from "node:crypto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CodeGenerator {
  static generateNumericCode(length = 8): string {
    const digits = "0123456789";
    const bytes = crypto.randomBytes(length);
    return Array.from(bytes)
      .map((b) => digits[b % 10])
      .join("");
  }

  static generateAlphanumericCode(length = 8): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = crypto.randomBytes(length);
    return Array.from(bytes)
      .map((b) => chars[b % chars.length])
      .join("");
  }

  static generatePaddedRandomIntCode(length = 8): string {
    const max = 10 ** length;
    return crypto.randomInt(0, max).toString().padStart(length, "0");
  }
}

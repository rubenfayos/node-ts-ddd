import Config from "@config";
import jwt from "jsonwebtoken";

interface JwtPayload extends Record<string, unknown> {
  sub: string; // Subject (e.g., user ID)
}

export class JwtService {
  private get secret(): string {
    return Config.JWT_SECRET;
  }

  private get expiresIn(): number {
    return Number.parseInt(Config.JWT_EXPIRES_IN ?? "604800000");
  }

  generateToken(payload: Omit<JwtPayload, "sub">, subject: string): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      subject,
    });
  }

  verifyToken<T = JwtPayload>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }
}

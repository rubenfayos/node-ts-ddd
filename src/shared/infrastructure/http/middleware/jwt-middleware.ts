import { AuthenticatedRequest } from "@shared/application/middlewares/authenticated-request";
import HttpStatus from "@shared/common/enums/http-status";
import { JwtService } from "@shared/security/jwt-service";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class JwtMiddleware {
  constructor(
    @inject(JwtService)
    private jwtService: JwtService,
  ) {}

  handle = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Missing or malformed token" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = this.jwtService.verifyToken(token) as { sub: string; roles: string[] };

      res.locals.user = {
        id: payload.sub,
        ...payload,
      };

      return next();
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
  };
}

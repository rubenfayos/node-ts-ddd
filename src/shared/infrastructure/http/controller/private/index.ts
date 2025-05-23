import userRouter from "@shared/infrastructure/http/controller/private/user/v1";
import filesRouter from "@shared/infrastructure/http/controller/private/files/v1";

import { Router } from "express";

import { JwtMiddleware } from "@shared/infrastructure/http/middleware/jwt-middleware";
import { container } from "tsyringe";

const router = Router();

const jwtMiddleware = container.resolve(JwtMiddleware);

router.use("", jwtMiddleware.handle);

router.use("/v1/users", userRouter);

router.use("/v1/files", filesRouter);

export default router;

import userRouter from "@shared/infraestructure/http/controller/private/user/v1";
import { Router } from "express";

import { JwtMiddleware } from "@shared/infraestructure/http/middleware/jwt-middleware";
import { container } from "tsyringe";

const router = Router();

const jwtMiddleware = container.resolve(JwtMiddleware);

router.use("", jwtMiddleware.handle);

router.use("/v1/users", userRouter);

export default router;

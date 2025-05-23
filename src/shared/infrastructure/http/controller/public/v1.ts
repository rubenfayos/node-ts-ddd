import { AuthController } from "@modules/auth/infrastructure/http/controller/auth-controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const authRouter = container.resolve(AuthController).register();

router.use("/auth", authRouter);

export default router;

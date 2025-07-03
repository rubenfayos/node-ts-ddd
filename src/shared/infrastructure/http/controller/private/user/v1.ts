import { UserController } from "@modules/user/infrastructure/http/controller/controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

// Resolve routers
const usersRouter = container.resolve(UserController).register();

router.use(usersRouter);

export default router;

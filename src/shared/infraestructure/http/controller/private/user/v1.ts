import { UserController } from "@modules/user/infraestructure/http/controller/controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

// Resolve routers
const usersRouter = container.resolve(UserController).register();

router.use(usersRouter);

export default router;

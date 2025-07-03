import { AuthController } from "@modules/auth/infrastructure/http/controller/auth-controller";
import { CustomerServiceController } from "@modules/customer-service/infraestructure/http/controller/customer-service-controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const authRouter = container.resolve(AuthController).register();
const customerServiceRouter = container.resolve(CustomerServiceController).register();

router.use("/auth", authRouter);
router.use("/customer-service", customerServiceRouter);

export default router;

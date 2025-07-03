import { OrganizationController } from "@modules/organizations/infraestructure/http/controller/controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

const organizationsRouter = container.resolve(OrganizationController).register();

router.use(organizationsRouter);

export default router;

import { FileController } from "@modules/file/infraestructure/http/controller/file-controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

// Resolve routers
const filesRouter = container.resolve(FileController).register();

router.use(filesRouter);

export default router;

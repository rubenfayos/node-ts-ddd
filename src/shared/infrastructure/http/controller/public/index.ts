import v1Router from "@shared/infrastructure/http/controller/public/v1";
import { Router } from "express";

const router = Router();

router.use("/v1", v1Router);

export default router;

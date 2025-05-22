import v1Router from "@shared/infraestructure/http/controller/public/v1";
import { Router } from "express";

const router = Router();

router.use("/v1", v1Router);

export default router;

import { Router } from "express";
import Routers from "./Routers/OrderRouter.js";
import ServiceRouter from "./Routers/ServiceRouter.js";

const router = Router();

router.use("/api", Routers);
router.use("/api", ServiceRouter);

export default router;

import { Router } from "express";
import Routers from "./Routers/OrderRouter.js";
import ServiceRouter from "./Routers/ServiceRouter.js";
import SendMailRouter from "./Routers/SendMailRouter.js";

const router = Router();

router.use("/api", Routers);
router.use("/api", ServiceRouter);
router.use("/api", SendMailRouter);

export default router;

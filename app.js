import { Router } from "express";
import Routers from "./Routers/OrderRouter.js";
import ServiceRouter from "./Routers/ServiceRouter.js";
import SendMailRouter from "./Routers/SendMailRouter.js";
import PaymentRouter from "./Routers/PaymentRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";

const router = Router();

router.use("/api", Routers);
router.use("/api", ServiceRouter);
router.use("/api", SendMailRouter);
router.use("/api", PaymentRouter);
router.use("/api", AuthRouter);

export default router;

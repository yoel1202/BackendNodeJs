import { Router } from "express";
import { methods as credits } from "../controllers/credits.controller"
import { methods as login } from "../controllers/login.controller";

const router = Router();

router.get("/listToCredits", login.verifyToken, credits.listToCredits);
router.get("/searchCredits", login.verifyToken, credits.searchCredits);
router.get("/calculateAmountByReceipt", login.verifyToken, credits.calculateAmountByReceipt);
router.get("/calculateLastInvoice", login.verifyToken, credits.calculateLastInvoice);
router.get("/lastPeriod", login.verifyToken, credits.lastPeriod);
router.get("/historyPayment", login.verifyToken, credits.historyPayment);
router.patch("/updatePeriod", login.verifyToken, credits.updatePeriod);

export default router;

import { Router } from "express";
import { methods as credits } from "../controllers/clients.controller"
import { methods as login } from "../controllers/login.controller";

const router = Router();

router.get("/getName", login.verifyToken, credits.getName);
router.post("/insertClient", login.verifyToken, credits.insertClient);

export default router;

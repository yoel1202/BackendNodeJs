import { Router } from "express";
import { methods as login } from "../controllers/login.controller";

const router = Router();

router.post("/authentication", login.login);
router.post("/verifyTokenUsers", login.verifyTokenUsers);
export default router;

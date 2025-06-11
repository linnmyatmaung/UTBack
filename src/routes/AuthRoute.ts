import { AuthController } from "@controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/Plogin", AuthController.PinCodeLogin);
router.post("/Alogin", AuthController.AdminLogin);
router.post("/create", AuthController.createAdmin);

export default router;

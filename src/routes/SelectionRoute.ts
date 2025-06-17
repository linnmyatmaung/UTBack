import { SelectionController } from "@controllers/SelectionController";
import {
  authenticateAdminToken,
  authenticatePinCodeToken,
} from "@middlewares/AuthMiddleware";
import { Router } from "express";

const router = Router();

router.post("/", authenticateAdminToken, SelectionController.createSelection);
router.get("/", authenticatePinCodeToken, SelectionController.getAllSelection);
router.put("/:id", authenticateAdminToken, SelectionController.updateSelection);
router.get(
  "/:id",
  authenticateAdminToken,
  SelectionController.getSelectionById
);
router.delete(
  "/:id",
  authenticateAdminToken,
  SelectionController.deleteSelection
);

export default router;

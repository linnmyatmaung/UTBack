import { Router } from "express";
import { AgendaController } from "@controllers/AgendaController";
import { authenticateAdminToken } from "@middlewares/AuthMiddleware";
const router = Router();

router.get("/", AgendaController.getAllAgendas);
router.get("/:id", AgendaController.getAgendaById);
router.post("/", authenticateAdminToken, AgendaController.createAgenda);
router.put("/:id", authenticateAdminToken, AgendaController.updateAgenda);
router.put(
  "/current/:id",
  authenticateAdminToken,
  AgendaController.currentAgenda
);
router.delete("/:id", authenticateAdminToken, AgendaController.deleteAgenda);

export default router;

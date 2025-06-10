import { Router } from "express";
import { AgendaController } from "@controllers/AgendaController";
import { Server } from "socket.io";

const router = Router();

export function setSocketIO(io: Server) {
  AgendaController.setSocketIO(io);
}

router.get("/", AgendaController.getAllAgendas);
router.get("/:id", AgendaController.getAgendaById);
router.post("/", AgendaController.createAgenda);
router.put("/:id", AgendaController.updateAgenda);
router.put("/current/:id", AgendaController.currentAgenda);
router.delete("/:id", AgendaController.deleteAgenda);

export default router;

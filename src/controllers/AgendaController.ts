import { Request, Response } from "express";
import { Server } from "socket.io";
import { AgendaService } from "@services/AgendaService";

export class AgendaController {
  private static io: Server;

  public static setSocketIO(ioInstance: Server) {
    this.io = ioInstance;
  }

  static async getAllAgendas(req: Request, res: Response) {
    try {
      const agendas = await AgendaService.getAllAgendas();
      res.status(200).json(agendas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting agendas", error });
    }
  }

  static async getAgendaById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const agenda = await AgendaService.getAgendaById(id);
      res.status(200).json(agenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting agenda", error });
    }
  }

  static async createAgenda(req: Request, res: Response) {
    try {
      const agendaData = req.body;
      const agenda = await AgendaService.createAgenda(agendaData);
      res.status(201).json(agenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating agenda", error });
    }
  }

  static async updateAgenda(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updated = await AgendaService.updateAgenda(id, data);
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating agenda", error });
    }
  }

  static async deleteAgenda(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await AgendaService.deleteAgenda(id);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting agenda", error });
    }
  }

  static async currentAgenda(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updated = await AgendaService.setCurrentAgenda(id, data);

      // Emit real-time update via WebSocket
      if (this.io) {
        this.io.emit("agendaUpdated", updated);
      }

      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating current agenda", error });
    }
  }
}

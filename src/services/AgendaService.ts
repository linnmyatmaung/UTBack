import { AgendaRepository } from "@repositories/AgendaRepository";
import { DateTime } from "luxon";
import { Not } from "typeorm";
import {
  AgendaRequest,
  AgendaResponse,
  CurrentAgendaRequest,
} from "@dtos/AgendaDto";

export class AgendaService {
  static async getAllAgendas(): Promise<AgendaResponse[]> {
    const agendas = await AgendaRepository.find();
    return agendas.map((agenda) => {
      const { id, time, title, name, info, current } = agenda;
      return { id, time, title, name, info, current };
    });
  }

  static async getAgendaById(id: number): Promise<AgendaResponse> {
    const agenda = await AgendaRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }
    const { time, title, name, info, current } = agenda;
    return { id, time, title, name, info, current };
  }

  static async createAgenda(data: AgendaRequest[]): Promise<AgendaResponse[]> {
    // Delete all existing records in the Agenda table
    await AgendaRepository.clear(); // This removes all rows from the table
    // Save the new agenda data
    const newAgenda = await AgendaRepository.save(data);

    // Map and return the response
    return newAgenda.map((agenda) => {
      const { id, time, title, name, info, current } = agenda;
      return { id, time, title, name, info, current };
    });
  }

  static async updateAgenda(
    id: number,
    data: AgendaRequest
  ): Promise<AgendaResponse> {
    const agenda = await AgendaRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }
    Object.assign(agenda, data);
    const updatedAgenda = await AgendaRepository.save(agenda);
    const { time, title, name, info, current } = updatedAgenda;
    return { id, time, title, name, info, current };
  }

  static async deleteAgenda(id: number) {
    await AgendaRepository.delete({ id });
    return "successfully deleted";
  }

  static async setCurrentAgenda(
    id: number,
    data: CurrentAgendaRequest
  ): Promise<AgendaResponse> {
    const agenda = await AgendaRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }

    Object.assign(agenda, data);

    // Get current time in Yangon, Myanmar timezone
    const formatTime = () => {
      const yangonTime = DateTime.now().setZone("Asia/Yangon");
      let hours = yangonTime.hour;
      const minutes = yangonTime.minute;
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${formattedMinutes} ${ampm}`;
    };

    if (!agenda.time) {
      agenda.time = formatTime();
    }

    agenda.current = true;

    const updatedAgenda = await AgendaRepository.save(agenda);

    const { time, title, name, info, current } = updatedAgenda;
    return { id, time, title, name, info, current };
  }
}

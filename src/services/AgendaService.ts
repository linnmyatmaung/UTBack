import { AgendaRepository } from "@repositories/AgendaRepository";
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
    // Find the agenda to be updated
    const agenda = await AgendaRepository.findOneBy({ id });
    if (!agenda) {
      throw new Error("Agenda not found");
    }
    // Update the agenda with the provided data
    Object.assign(agenda, data);

    // Get the current time in the desired format
    const formatTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 0 to 12 for midnight
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${formattedMinutes} ${ampm}`;
    };

    // Set the time only if it's empty or undefined
    if (!agenda.time) {
      agenda.time = formatTime();
    }

    agenda.current = true; // Set 'current' to true for the selected agenda

    // Save the updated agenda
    const updatedAgenda = await AgendaRepository.save(agenda);

    // Return the relevant properties of the updated agenda
    const { time, title, name, info, current } = updatedAgenda;
    return { id, time, title, name, info, current };
  }
}

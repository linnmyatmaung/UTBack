import { AppDataSource } from "@config/data-source";
import { Agenda } from "@entities/Agenda";

export const AgendaRepository = AppDataSource.getRepository(Agenda);

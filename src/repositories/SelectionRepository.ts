import { AppDataSource } from "@config/data-source";
import { UTSelection } from "@entities/Selection";

export const SelectionRepository = AppDataSource.getRepository(UTSelection);

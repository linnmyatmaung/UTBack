import { AppDataSource } from "@config/data-source";
import { PinCode } from "@entities/PinCode";

export const PinCodeRepository = AppDataSource.getRepository(PinCode);

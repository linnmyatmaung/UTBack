import { SelectionRequest, SelectionResponse } from "@dtos/SelectionDto";
import { UTSelection } from "@entities/Selection";
import { SelectionRepository } from "@repositories/SelectionRepository";
import path from "path";
import fs from "fs";

export class SelectionService {
  static async createSelection(
    data: SelectionRequest
  ): Promise<SelectionResponse> {
    const selection = new UTSelection();
    Object.assign(selection, data);
    const savedSelection = await SelectionRepository.save(selection);
    const { id, name, gender, profileImg, major, hobby } = savedSelection;
    return { id, name, gender, profileImg, major, hobby };
  }

  static async getAllSelection(): Promise<SelectionResponse[]> {
    const selections = await SelectionRepository.find();
    return selections.map((selection) => {
      const { id, name, gender, profileImg, major, hobby } = selection;
      return { id, name, gender, profileImg, major, hobby };
    });
  }

  static async getSelectionById(id: number): Promise<SelectionResponse> {
    const selection = await SelectionRepository.findOneBy({ id });
    if (!selection) {
      throw new Error("Selection not found");
    }
    const { name, gender, profileImg, major, hobby } = selection;
    return { id, name, gender, profileImg, major, hobby };
  }

  static async updateSelection(
    id: number,
    data: SelectionRequest
  ): Promise<SelectionResponse> {
    const selection = await SelectionRepository.findOneBy({ id });
    if (!selection) {
      throw new Error("Selection not found");
    }

    Object.assign(selection, data);

    // No file deletion, just replace the Cloudinary URL
    const updatedSelection = await SelectionRepository.save(selection);

    const { name, gender, profileImg, major, hobby } = updatedSelection;
    return { id, name, gender, profileImg, major, hobby };
  }

  static async deleteSelection(id: number) {
    await SelectionRepository.delete({ id });
    return "successfully deleted";
  }
}

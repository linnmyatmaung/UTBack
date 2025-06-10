import { SelectionService } from "@services/SelectionService";
import { Request, Response } from "express";

export class SelectionController {

    static async createSelection(req: Request, res: Response){
        try {
            const selectionData = req.body;
            const profileImg = req.file?.filename; 
            const selection = await SelectionService.createSelection(selectionData ,profileImg);
            res.status(201).json(selection);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error creating Selection", error });
        }
    }

    static async getAllSelection(req: Request , res: Response){
        try {
            const allSelection = await SelectionService.getAllSelection();
            res.status(200).json(allSelection);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting Selection", error });
        }
    }

    static async getSelectionById(req: Request , res: Response){
        try{
            const id = parseInt(req.params.id);
            const selection = await SelectionService.getSelectionById(id);
            res.status(200).json(selection);
        }catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error getting Selection", error });
        }
    }

    static async updateSelection(req: Request , res: Response){
        try {
            const id  = parseInt(req.params.id);
            const data = req.body;
            const profileImg = req.file?.filename; 
            const updatedSelection = await SelectionService.updateSelection(id , data , profileImg);
            res.status(200).json(updatedSelection);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: "Error update Selection", error });
        }
    }

    static async deleteSelection(req: Request , res: Response){
        try{
            const id = parseInt(req.params.id);
            const resp = await SelectionService.deleteSelection(id);
            res.status(200).json({message : resp});
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Error deleting Selection" , error});
        }
    }

}

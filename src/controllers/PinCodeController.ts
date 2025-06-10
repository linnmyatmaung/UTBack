import { Request, Response } from 'express';
import { PinCodeService } from '../services/PinCodeService';

export class PinCodeController {


    public static async createPinCode(req: Request, res: Response): Promise<void> {
        try {
            const count = parseInt(req.params.code);
            const result = await PinCodeService.generateCodes(count);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error creating PinCode', error });
        }
    }

    public static async getPinCodeStatus(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader.split(' ')[1];
            const status = await PinCodeService.getPinCodeStatus(token);
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ message: 'Error getting PinCode status', error });
        }
    }

}
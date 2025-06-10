import { PinCodeService } from "@services/PinCodeService";
import { VoteLogService } from "@services/VoteLogService";
import { Request, Response } from "express";

export class VoteLogController {

    static async insertVoteLog(req: Request, res: Response) {
        try {
            const voteLog = req.body;
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: "Authorization token is missing" });
                return;
            }
            const codeId = await PinCodeService.getPinCodefromJWT(token);
            const vote = await VoteLogService.insertVoteLog(voteLog, codeId);
            res.status(201).json(vote);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating VoteLog", error });
        }
    }

    static async getVoteCounts(req: Request, res: Response) {
        try {

            const votes = await VoteLogService.getVoteCounts();
            res.status(200).json(votes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating VoteLog", error });
        }
    }
}
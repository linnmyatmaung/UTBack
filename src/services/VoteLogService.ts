import {
  VoteCountDto,
  VoteCountsResponseDto,
  VoteLogRequest,
  VoteLogResponse,
} from "@dtos/VoteLogDto";
import { VoteLog } from "@entities/Votelog";
import { PinCodeRepository } from "@repositories/PinCodeRepository";
import { SelectionRepository } from "@repositories/SelectionRepository";
import { VoteLogRepository } from "@repositories/VoteLogRepository";

export class VoteLogService {
  static async insertVoteLog(
    voteLog: VoteLogRequest,
    codeId: number
  ): Promise<VoteLogResponse> {
    const pinCode = await PinCodeRepository.findOneBy({ id: codeId });
    const maleSeletion = await SelectionRepository.findOneBy({
      id: voteLog.maleId,
    });
    const femaleSeletion = await SelectionRepository.findOneBy({
      id: voteLog.femaleId,
    });

    if (pinCode && maleSeletion && femaleSeletion) {
      const vote = new VoteLog();
      vote.pinCode = pinCode;
      vote.maleSelection = maleSeletion;
      vote.femaleSelection = femaleSeletion;
      pinCode.status = 1;

      await PinCodeRepository.save(pinCode);
      const savedVote = await VoteLogRepository.save(vote);
      const res: VoteLogResponse = {
        pinCode: savedVote.pinCode.code,
        maleName: savedVote.maleSelection.name,
        femaleName: savedVote.femaleSelection.name,
      };
      return res;
    } else {
      throw new Error("Invalid pinCode or selection");
    }
  }

  static async getVoteCounts(): Promise<VoteCountsResponseDto> {
    const maleVotesRaw = await VoteLogRepository.getMaleVoteCounts();
    const femaleVotesRaw = await VoteLogRepository.getFemaleVoteCounts();

    // Map raw results to DTO objects
    const maleVotes: VoteCountDto[] = maleVotesRaw.map((row) => ({
      selectionId: row.selectionId,
      selectionName: row.selectionName,
      voteCount: Number(row.voteCount),
    }));

    const femaleVotes: VoteCountDto[] = femaleVotesRaw.map((row) => ({
      selectionId: row.selectionId,
      selectionName: row.selectionName,
      voteCount: Number(row.voteCount),
    }));

    return { maleVotes, femaleVotes };
  }
}

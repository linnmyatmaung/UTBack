import { AppDataSource } from "@config/data-source";
import { VoteCountDto, VoteCountsResponseDto } from "@dtos/VoteLogDto";
import { VoteLog } from "@entities/Votelog";

export const VoteLogRepository = AppDataSource.getRepository(VoteLog).extend({
  async getMaleVoteCounts(): Promise<VoteCountDto[]> {
    const maleVotesRaw = await this.createQueryBuilder("voteLog")
      .leftJoinAndSelect("voteLog.maleSelection", "maleSelection")
      .select("maleSelection.id", "selectionId")
      .addSelect("maleSelection.name", "selectionName") // Assuming UTSelection has a 'name' field
      .addSelect("COUNT(voteLog.id)", "voteCount")
      .groupBy("maleSelection.id")
      .getRawMany();

    const maleVotes: VoteCountDto[] = maleVotesRaw.map((row) => ({
      selectionId: row.selectionId,
      selectionName: row.selectionName,
      voteCount: Number(row.voteCount),
    }));

    return maleVotes;
  },
  async getFemaleVoteCounts(): Promise<VoteCountDto[]> {
    const femaleVotesRaw = await this.createQueryBuilder("voteLog")
      .leftJoinAndSelect("voteLog.femaleSelection", "femaleSelection")
      .select("femaleSelection.id", "selectionId")
      .addSelect("femaleSelection.name", "selectionName") // Assuming UTSelection has a 'name' field
      .addSelect("COUNT(voteLog.id)", "voteCount")
      .groupBy("femaleSelection.id")
      .getRawMany();

    const femaleVotes: VoteCountDto[] = femaleVotesRaw.map((row) => ({
      selectionId: row.selectionId,
      selectionName: row.selectionName,
      voteCount: Number(row.voteCount),
    }));

    return femaleVotes;
  },
});

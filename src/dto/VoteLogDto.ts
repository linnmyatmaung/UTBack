export type VoteLogRequest = {
  maleId: number;
  femaleId: number;
};

export type VoteLogResponse = {
  pinCode: string;
  maleName: string;
  femaleName: string;
};

// dtos/VoteCountDto.ts
export interface VoteCountDto {
  selectionId: number;
  selectionName: string;
  voteCount: number;
}

export interface VoteCountsResponseDto {
  maleVotes: VoteCountDto[];
  femaleVotes: VoteCountDto[];
}

import { IsDateString } from "class-validator";

export class StartUserChallengeDto {
  @IsDateString()
  startedAt!: string;
}

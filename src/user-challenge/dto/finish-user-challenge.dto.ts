import { IsDateString } from "class-validator";

export class FinishUserChallengeDto {
  @IsDateString()
  finishedAt!: string; // ISO8601 date-time string
}

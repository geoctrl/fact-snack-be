import { IsUUID } from "class-validator";

export class NewUserChallengeDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  challengeId!: string;
}

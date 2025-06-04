import { IsBoolean, IsUUID } from "class-validator";

export class TrackAnswerDto {
  @IsUUID()
  questionId!: string;
  @IsBoolean()
  answer!: boolean;
}

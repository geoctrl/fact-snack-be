import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class NewQuestionDto {
  @IsUUID()
  challenge_id!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsOptional()
  explanation?: string;

  answer!: boolean;

  @IsString()
  @IsOptional()
  source_text?: string;

  @IsString()
  @IsOptional()
  source_url?: string;
}

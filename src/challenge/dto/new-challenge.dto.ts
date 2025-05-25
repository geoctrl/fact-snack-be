import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsUUID,
} from "class-validator";

export class NewChallengeDto {
  @IsDateString()
  assigned_date!: string; // YYYY-MM-DD

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  @IsUUID("all", { each: true })
  @IsOptional()
  question_order?: string[];
}

import { Module } from "@nestjs/common";
import { ChallengeController } from "./challenge/challenge.controller";
import { ChallengeService } from "./challenge/challenge.service";
import { ChallengeRepository } from "./challenge/challenge.repository";
import { QuestionController } from "./question/question.controller";
import { QuestionService } from "./question/question.service";
import { QuestionRespository } from "./question/question.respository";

@Module({
  controllers: [ChallengeController, QuestionController],
  providers: [
    ChallengeService,
    ChallengeRepository,
    QuestionService,
    QuestionRespository,
  ],
})
export class ChallengeModule {}

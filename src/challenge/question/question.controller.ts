import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { NewQuestionDto } from "../dto/new-question.dto";

@Controller()
export class QuestionController {
  constructor(public questionService: QuestionService) {}
  @Post("question")
  async createQuestion(@Body() body: NewQuestionDto) {
    return await this.questionService.createQuestion(body);
  }
  @Post("questions")
  async createBulkQuestions(@Body() body: NewQuestionDto[]) {
    return await this.questionService.createBulkQuestions(body);
  }
  @Get("questions/:challengeId")
  async getQuestionsForChallenge(@Param("challengeId") challengeId: string) {
    return await this.questionService.getQuestionsForChallenge(challengeId);
  }
}

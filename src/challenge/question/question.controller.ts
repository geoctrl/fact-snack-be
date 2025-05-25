import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { NewQuestionDto } from "../dto/new-question.dto";

@Controller()
export class QuestionController {
  constructor(public questionService: QuestionService) {}
  @Post("question")
  createQuestion(@Body() body: NewQuestionDto) {
    return this.questionService.createQuestion(body);
  }
  @Post("questions")
  createBulkQuestions(@Body() body: NewQuestionDto[]) {
    return this.questionService.createBulkQuestions(body);
  }
  @Get("questions/:challengeId")
  getQuestionsForChallenge(@Param("challengeId") challengeId: string) {
    return this.questionService.getQuestionsForChallenge(challengeId);
  }
}

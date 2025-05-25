import { Injectable } from "@nestjs/common";
import { QuestionRespository } from "./question.respository";
import { NewQuestionDto } from "../dto/new-question.dto";
import { ChallengeRepository } from "../challenge/challenge.repository";
import { Question } from "../../types";

@Injectable()
export class QuestionService {
  constructor(
    public questionRepo: QuestionRespository,
    public challengeRepo: ChallengeRepository,
  ) {}

  async createQuestion(question: NewQuestionDto) {
    const newQuestion = await this.questionRepo.createQuestion(question);
    const challenge = await this.challengeRepo.getChallengeById(
      question.challenge_id,
    );
    if (!challenge) {
      throw new Error("Challenge not found");
    }
    const questionOrder = challenge.question_order || [];
    questionOrder.push(newQuestion.id);
    const updatedChallenge = await this.challengeRepo.updateChallenge(
      question.challenge_id,
      {
        question_order: questionOrder,
      },
    );
    if (!updatedChallenge) {
      throw new Error("Error updating challenge");
    }
    return newQuestion;
  }
  async createBulkQuestions(questions: NewQuestionDto[]) {
    const newQuestions: Question[] =
      await this.questionRepo.createBulkQuestions(questions);
    const challengeIds = questions.map((question) => question.challenge_id);
    const uniqueChallengeIds = [...new Set(challengeIds)];
    const challenges =
      await this.challengeRepo.getChallengesByIds(uniqueChallengeIds);

    for (const challenge of challenges) {
      const questionOrder = challenge.question_order || [];
      const newQuestionIds = newQuestions
        .filter((question: Question) => question.challenge_id === challenge.id)
        .map((question) => question.id);
      questionOrder.push(...newQuestionIds);
      await this.challengeRepo.updateChallenge(challenge.id, {
        question_order: questionOrder,
      });
    }
    return newQuestions;
  }

  getQuestionsForChallenge(challengeId: string) {
    return this.questionRepo.getQuestionsForChallenge(challengeId);
  }
}

import { Injectable } from "@nestjs/common";
import { UserChallengeRepository } from "./user-challenge.respository";
import { FinishUserChallengeDto } from "./dto/finish-user-challenge.dto";
import { QuestionRespository } from "../challenge/question/question.respository";

@Injectable()
export class UserChallengeService {
  constructor(
    public userChallengeRepo: UserChallengeRepository,
    public questionRepo: QuestionRespository,
  ) {}
  createUserChallenge(userId: string, challengeId: string, startedAt: string) {
    return this.userChallengeRepo.createUserChallenge(
      userId,
      challengeId,
      startedAt,
    );
  }
  getUserChallenge(userId: string, challengeId: string) {
    return this.userChallengeRepo.getUserChallenge(userId, challengeId);
  }
  async finishChallenge(
    userId: string,
    challengeId: string,
    updates: FinishUserChallengeDto,
  ) {
    const questions =
      await this.questionRepo.getQuestionsForChallenge(challengeId);
    const userChallenge = await this.userChallengeRepo.getUserChallenge(
      userId,
      challengeId,
    );
    const answers = userChallenge?.answers ?? {};
    const score = questions?.reduce((acc, question) => {
      const hasAnswer = Object.prototype.hasOwnProperty.call(
        answers,
        question.id,
      ) as boolean;
      if (!hasAnswer) return acc;
      const isCorrect = question.answer === answers[question.id];
      return isCorrect ? acc + 1 : acc;
    }, 0);
    return this.userChallengeRepo.updateUserChallenge(userId, challengeId, {
      ...updates,
      score,
    });
  }
  async trackAnswer(
    userId: string,
    challengeId: string,
    questionId: string,
    answer: boolean,
  ) {
    const userChallenge = await this.userChallengeRepo.getUserChallenge(
      userId,
      challengeId,
    );
    const answers = userChallenge?.answers ?? {};
    return this.userChallengeRepo.updateUserChallenge(userId, challengeId, {
      answers: {
        ...answers,
        [questionId]: answer,
      },
    });
  }
}

import { Injectable } from "@nestjs/common";
import { UserChallengeRepository } from "./user-challenge.respository";
import { NewUserChallengeDto } from "./dto/new-user-challenge.dto";

@Injectable()
export class UserChallengeService {
  constructor(public userChallengeRepo: UserChallengeRepository) {}
  createUserChallenge(newUserChallenge: NewUserChallengeDto) {
    return this.userChallengeRepo.createUserChallenge(newUserChallenge);
  }
  getUserChallenge(userId: string, challengeId: string) {
    return this.userChallengeRepo.getUserChallenge(userId, challengeId);
  }
}

import { Injectable } from "@nestjs/common";
import { ChallengeRepository } from "./challenge.repository";
import { NewChallengeDto } from "../dto/new-challenge.dto";

@Injectable()
export class ChallengeService {
  constructor(public challengeRepo: ChallengeRepository) {}
  createChallenge(challenge: NewChallengeDto) {
    return this.challengeRepo.createChallenge(challenge);
  }
  getCurrentChallenge(date: string) {
    return this.challengeRepo.getChallengeByDate(date);
  }
}

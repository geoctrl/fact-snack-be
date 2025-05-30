import { Module } from "@nestjs/common";
import { UserChallengeController } from "./user-challenge.controller";
import { UserChallengeService } from "./user-challenge.service";
import { UserChallengeRepository } from "./user-challenge.respository";

@Module({
  controllers: [UserChallengeController],
  providers: [UserChallengeService, UserChallengeRepository],
})
export class UserChallengeModule {}

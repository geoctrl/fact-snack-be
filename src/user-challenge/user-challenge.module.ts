import { Module } from "@nestjs/common";
import { UserChallengeController } from "./user-challenge.controller";
import { UserChallengeService } from "./user-challenge.service";
import { UserChallengeRepository } from "./user-challenge.respository";
import { ChallengeModule } from "../challenge/challenge.module";

@Module({
  controllers: [UserChallengeController],
  providers: [UserChallengeService, UserChallengeRepository],
  imports: [ChallengeModule],
})
export class UserChallengeModule {}

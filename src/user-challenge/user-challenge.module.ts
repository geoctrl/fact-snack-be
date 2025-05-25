import { Module } from "@nestjs/common";
import { UserChallengeController } from "./user-challenge.controller";
import { UserChallengeService } from "./user-challenge.service";

@Module({
  controllers: [UserChallengeController],
  providers: [UserChallengeService],
})
export class UserChallengeModule {}

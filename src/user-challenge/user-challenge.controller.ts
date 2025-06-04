import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UserChallengeService } from "./user-challenge.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { FinishUserChallengeDto } from "./dto/finish-user-challenge.dto";
import { StartUserChallengeDto } from "./dto/start-user-challenge.dto";
import { TrackAnswerDto } from "./dto/track-answer.dto";

@Controller("user-challenge")
export class UserChallengeController {
  constructor(public userChallengeService: UserChallengeService) {}
  @UseGuards(AuthGuard)
  @Post("start/:challengeId")
  async startUserChallenge(
    @Req() req: AuthenticatedRequest,
    @Param("challengeId") challengeId: string,
    @Body() body: StartUserChallengeDto,
  ) {
    const userId = req.user.id;
    return await this.userChallengeService.createUserChallenge(
      userId,
      challengeId,
      body.startedAt,
    );
  }
  @UseGuards(AuthGuard)
  @Patch("finish/:challengeId")
  async finishUserChallenge(
    @Param("challengeId") challengeId: string,
    @Req() req: AuthenticatedRequest,
    @Body() body: FinishUserChallengeDto,
  ) {
    const userId = req.user.id;
    return await this.userChallengeService.finishChallenge(
      userId,
      challengeId,
      body,
    );
  }
  @UseGuards(AuthGuard)
  @Get(":challengeId")
  async getUserChallenge(
    @Param("challengeId") challengeId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    return await this.userChallengeService.getUserChallenge(
      userId,
      challengeId,
    );
  }
  @UseGuards(AuthGuard)
  @Patch("track/:challengeId")
  async trackAnswer(
    @Param("challengeId") challengeId: string,
    @Req() req: AuthenticatedRequest,
    @Body() body: TrackAnswerDto,
  ) {
    const userId = req.user.id;
    return await this.userChallengeService.trackAnswer(
      userId,
      challengeId,
      body.questionId,
      body.answer,
    );
  }
}

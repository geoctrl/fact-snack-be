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
import { NewUserChallengeDto } from "./dto/new-user-challenge.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("user-challenge")
export class UserChallengeController {
  constructor(public userChallengeService: UserChallengeService) {}
  @Post()
  createUserChallenge(@Body() body: NewUserChallengeDto) {
    return this.userChallengeService.createUserChallenge(body);
  }
  @Patch("finish")
  finishUserChallenge() {
    // Logic to update a user challenge
    return { message: "User challenge updated successfully" };
  }
  @UseGuards(AuthGuard)
  @Get(":challengeId")
  getUserChallenge(
    @Param("challengeId") challengeId: string,
    @Req() req: Request,
  ) {
    // const userId = req.user.id;
    // return this.userChallengeService.getUserChallenge(userId, challengeId);
  }
}

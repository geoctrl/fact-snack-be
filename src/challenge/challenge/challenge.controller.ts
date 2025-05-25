import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ChallengeService } from "./challenge.service";
import { NewChallengeDto } from "../dto/new-challenge.dto";

@Controller("challenge")
export class ChallengeController {
  constructor(public challengeService: ChallengeService) {}
  @Post()
  createChallenge(@Body() body: NewChallengeDto) {
    return this.challengeService.createChallenge(body);
  }
  @Get()
  getCurrentChallenge(@Query("date") date: string) {
    return this.challengeService.getCurrentChallenge(date);
  }
}

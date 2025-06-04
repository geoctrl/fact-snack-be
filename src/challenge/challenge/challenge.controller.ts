import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ChallengeService } from "./challenge.service";
import { NewChallengeDto } from "../dto/new-challenge.dto";

@Controller("challenge")
export class ChallengeController {
  constructor(public challengeService: ChallengeService) {}
  @Post()
  async createChallenge(@Body() body: NewChallengeDto) {
    return await this.challengeService.createChallenge(body);
  }
  @Get()
  async getCurrentChallenge(@Query("date") date: string) {
    return await this.challengeService.getCurrentChallenge(date);
  }
}

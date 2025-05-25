import { Test, TestingModule } from "@nestjs/testing";
import { UserChallengeController } from "./user-challenge.controller";

describe("UserChallengeController", () => {
  let controller: UserChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChallengeController],
    }).compile();

    controller = module.get<UserChallengeController>(UserChallengeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

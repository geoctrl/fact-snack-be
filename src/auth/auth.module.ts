import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { AuthController } from "./auth.controller";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}

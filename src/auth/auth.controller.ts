import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
  Get,
  Req,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { SupabaseService } from "../supabase/supabase.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post("sign-in")
  async signIn(
    @Body() { email, password }: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const authTokenResponsePassword =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    const { data, error } = authTokenResponsePassword;

    if (error || !data.session?.refresh_token) {
      throw new UnauthorizedException({
        success: false,
        data: authTokenResponsePassword,
        error: "Unauthorized",
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    res.cookie("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    return { success: true, data: authTokenResponsePassword };
  }

  @Post("create-account")
  async createAccount(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException("Email and password are required");
    }

    const authResponse = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });

    const { error } = authResponse;
    if (error) {
      throw new BadRequestException({
        success: false,
        data: error,
        message: error.message,
        statusCode: error.status ?? 400,
      });
    }

    return {
      success: true,
      data: authResponse,
      message:
        "Account created. Please check your email to verify your address.",
    };
  }

  @Post("verify-email")
  async verifyEmail(@Body() body: { token: string; email: string }) {
    const { token, email } = body;

    if (!token || !email) {
      throw new BadRequestException("Missing token or email");
    }

    const authResponse = await this.supabaseService.client.auth.verifyOtp({
      token_hash: token,
      type: "signup",
    });
    const { error } = authResponse;

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      success: true,
      data: authResponse,
    };
  }

  @Get("session")
  async getSession(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies["sb-refresh-token"] as string;
    if (!refreshToken) {
      throw new UnauthorizedException("No refresh token found");
    }

    const { data, error } =
      await this.supabaseService.client.auth.refreshSession({
        refresh_token: refreshToken,
      });

    if (error || !data.session?.access_token || !data.session.refresh_token) {
      throw new UnauthorizedException("Could not refresh session");
    }

    // 👇 Rotate the refresh token in the cookie
    res.cookie("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // ✅ Return new access token to frontend
    return {
      success: true,
      data: data.session,
    };
  }

  @Post("sign-out")
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies["sb-refresh-token"] as string;
    if (!refreshToken) {
      throw new UnauthorizedException("No refresh token found");
    }

    const { error } = await this.supabaseService.client.auth.signOut({
      scope: "global",
    });

    res.clearCookie("sb-refresh-token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      success: true,
    };
  }
}

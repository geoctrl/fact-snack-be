import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SupabaseService } from "../../supabase/supabase.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or malformed token");
    }

    const token = authHeader.split(" ")[1];

    const { data, error } =
      await this.supabaseService.client.auth.getUser(token);

    if (error || !data?.user) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    // Attach user to request
    req.user = data.user;

    return true;
  }
}

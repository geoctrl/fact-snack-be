import {
  Injectable,
  Logger,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
// ... other imports like DTOs ...
import { AuthError, Session, User } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly supabaseClient;

  constructor(private readonly supabaseService: SupabaseService) {
    // Get the initialized Supabase client (using Service Role Key)
    this.supabaseClient = this.supabaseService.client;
  }

  // ... (signUp and login methods here) ...

  /**
   * Validates a Supabase JWT token.
   * @param token The JWT string to validate.
   * @returns The Supabase User object if the token is valid, otherwise null.
   */
  async validateUserByToken(token: string): Promise<User | null> {
    try {
      // Use the Supabase admin client's `getUser` method.
      // This verifies the token signature and expiry against Supabase.
      const {
        data: { user },
        error,
      } = await this.supabaseClient.auth.client.getUser(token);

      console.log(error);

      if (error) {
        // Log the specific error if one occurred during validation
        this.logger.warn(`Token validation failed: ${error.message}`);
        return null; // Indicate validation failure (invalid signature, expired, etc.)
      }

      if (!user) {
        // If no error, but also no user, the token might be valid but user doesn't exist?
        // Or it could be an edge case. Treat as invalid.
        this.logger.warn("Token validation: No user found for valid token.");
        return null;
      }

      // If no error and user exists, the token is valid.
      return user; // Return the Supabase user object
    } catch (err: unknown) {
      // Catch any unexpected errors during the process
      this.logger.error("Unexpected error during token validation:", err);
      return null; // Indicate validation failure on unexpected error
    }
  }
}

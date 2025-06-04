import { Injectable } from "@nestjs/common";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { UserChallenge } from "src/types";
import { SupabaseService } from "src/supabase/supabase.service";

@Injectable()
export class UserChallengeRepository {
  constructor(private readonly supabaseService: SupabaseService) {}
  async createUserChallenge(
    userId: string,
    challengeId: string,
    startedAt: string,
  ): Promise<UserChallenge> {
    const response: PostgrestSingleResponse<UserChallenge[]> =
      await this.supabaseService.client
        .from("user_challenges")
        .insert([
          {
            user_id: userId,
            challenge_id: challengeId,
            started_at: startedAt,
          },
        ])
        .select("*");

    const { data, error } = response;

    if (error) {
      throw new Error(`Error creating user challenge: ${error.message}`);
    }

    if (!data || !data.length) {
      throw new Error("No user challenge was inserted.");
    }

    return data[0];
  }
  async getUserChallenge(
    userId: string,
    challengeId: string,
  ): Promise<UserChallenge | null> {
    const response: PostgrestSingleResponse<UserChallenge[]> =
      await this.supabaseService.client
        .from("user_challenges")
        .select("*")
        .eq("challenge_id", challengeId)
        .eq("user_id", userId);

    const { data, error } = response;

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Error fetching current challenge: ${error.message}`);
    }

    return data[0];
  }
  async updateUserChallenge(
    userId: string,
    challengeId: string,
    updates: Partial<UserChallenge>,
  ): Promise<UserChallenge | null> {
    const response: PostgrestSingleResponse<UserChallenge[]> =
      await this.supabaseService.client
        .from("user_challenges")
        .update(updates)
        .eq("user_id", userId)
        .eq("challenge_id", challengeId)
        .select("*");

    const { data, error } = response;

    if (error) {
      throw new Error(`Error updating user challenge: ${error.message}`);
    }

    return data[0] || null;
  }
}

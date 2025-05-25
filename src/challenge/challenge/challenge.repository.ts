import { Injectable } from "@nestjs/common";
import { SupabaseService } from "../../supabase/supabase.service";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Challenge } from "../../types";
import { NewChallengeDto } from "../dto/new-challenge.dto";

@Injectable()
export class ChallengeRepository {
  constructor(private readonly supabaseService: SupabaseService) {}
  async createChallenge(challenge: NewChallengeDto): Promise<Challenge> {
    const response: PostgrestSingleResponse<Challenge[]> =
      await this.supabaseService.client
        .from("challenges")
        .insert([challenge])
        .select("*");

    const { data, error } = response;

    if (error) {
      throw new Error(`Error creating challenge: ${error.message}`);
    }

    if (!data || !data.length) {
      throw new Error("No challenge was inserted.");
    }

    return data[0];
  }
  async getChallengeByDate(date: string): Promise<Challenge | null> {
    const response: PostgrestSingleResponse<Challenge> =
      await this.supabaseService.client
        .from("challenges")
        .select("*")
        .eq("assigned_date", date)
        .single();

    const { data, error } = response;

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Error fetching current challenge: ${error.message}`);
    }

    return data || null;
  }
  async getChallengeById(id: string): Promise<Challenge | null> {
    const response: PostgrestSingleResponse<Challenge> =
      await this.supabaseService.client
        .from("challenges")
        .select("*")
        .eq("id", id)
        .single();

    const { data, error } = response;

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Error fetching challenge by ID: ${error.message}`);
    }

    return data || null;
  }
  async updateChallenge(
    id: string,
    challenge: Partial<Challenge>,
  ): Promise<Challenge | null> {
    const response: PostgrestSingleResponse<Challenge> =
      await this.supabaseService.client
        .from("challenges")
        .update(challenge)
        .eq("id", id)
        .select("*")
        .single();

    const { data, error } = response;

    if (error) {
      throw new Error(`Error updating challenge: ${error.message}`);
    }

    return data || null;
  }
  async getChallengesByIds(ids: string[]): Promise<Challenge[]> {
    const response: PostgrestSingleResponse<Challenge[]> =
      await this.supabaseService.client
        .from("challenges")
        .select("*")
        .in("id", ids);

    const { data, error } = response;

    if (error) {
      throw new Error(`Error fetching challenges by IDs: ${error.message}`);
    }

    return data || [];
  }
}

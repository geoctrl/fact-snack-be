import { Injectable } from "@nestjs/common";
import { SupabaseService } from "../../supabase/supabase.service";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Challenge, Question } from "../../types";
import { NewQuestionDto } from "../dto/new-question.dto";

@Injectable()
export class QuestionRespository {
  constructor(private readonly supabaseService: SupabaseService) {}
  async createQuestion(question: NewQuestionDto): Promise<Challenge> {
    const response: PostgrestSingleResponse<Challenge[]> =
      await this.supabaseService.client
        .from("questions")
        .insert([question])
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
  async createBulkQuestions(questions: NewQuestionDto[]): Promise<Question[]> {
    const response: PostgrestSingleResponse<Question[]> =
      await this.supabaseService.client
        .from("questions")
        .insert(questions)
        .select("*");

    const { data, error } = response;

    if (error) {
      throw new Error(`Error creating challenge: ${error.message}`);
    }

    if (!data || !data.length) {
      throw new Error("No challenge was inserted.");
    }

    return data;
  }
  async getQuestionsForChallenge(
    challengeId: string,
  ): Promise<Question[] | null> {
    const response: PostgrestSingleResponse<Question[]> =
      await this.supabaseService.client
        .from("questions")
        .select("*")
        .eq("challenge_id", challengeId);

    const { data, error } = response;

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Error fetching current challenge: ${error.message}`);
    }

    return data || null;
  }
}

export interface Challenge {
  id: string;
  created_at: string;
  assigned_date: string;
  title: string;
  question_order?: string[];
}

export interface Question {
  id: string;
  created_at: string;
  text: string;
  explanation?: string;
  answer: boolean;
  challenge_id: string;
  source_text?: string;
  source_url?: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  score?: number;
  answers: Record<string, boolean>;
  started_at: string;
  finished_at?: string;
}

export interface User {
  id: string;
  created_at: string;
  handle: string;
  name: string;
  email: string;
  is_admin: boolean;
  longest_streak: number;
  streak_start_date?: string;
  streak_end_date?: string;
}

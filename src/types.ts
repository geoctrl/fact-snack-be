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

import { User as SupabaseUser } from "@supabase/supabase-js";

declare global {
  namespace Express {
    export interface Request {
      user?: SupabaseUser;
    }
  }
}

export {};

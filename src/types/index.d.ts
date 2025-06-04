import { Request } from "express";
import { User as SupabaseUser } from "@supabase/supabase-js";

declare global {
  type AuthenticatedRequest = Request & {
    user: SupabaseUser;
  };
}

export {};

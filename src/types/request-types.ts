// src/types/express.d.ts
import { User as SupabaseUser } from "@supabase/supabase-js"; // Alias User type

// Extend the Express Request interface globally
declare global {
  namespace Express {
    export interface Request {
      // Add the optional 'user' property holding the Supabase user object
      user?: SupabaseUser;
    }
  }
}

// Adding this empty export makes it a module file, which can be important
export {};

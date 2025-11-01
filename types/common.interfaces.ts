import { User, Session } from "@supabase/supabase-js";

// Database Types
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Auth Response Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AuthResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}

// Auth Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  fullName?: string;
}

// Re-export Supabase types for convenience
export type { User, Session };
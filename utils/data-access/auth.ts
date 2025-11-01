"use server";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import type {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  User,
  Session,
  Profile,
} from "@/types/common.interfaces";


export async function signUp({
  email,
  password,
  fullName,
}: SignupCredentials): Promise<AuthResponse<User>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: "Failed to create user",
      };
    }

    return {
      success: true,
      data: data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during signup",
    };
  }
}

export async function login({
  email,
  password,
}: LoginCredentials): Promise<AuthResponse<Session>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (!data.session) {
      return {
        success: false,
        error: "Failed to create session",
      };
    }

    return {
      success: true,
      data: data.session,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during login",
    };
  }
}


export async function logOut(): Promise<AuthResponse<null>> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during logout",
    };
  }
}

async function getCurrentUserCache():Promise<User | null> {
    try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export const getCurrentUser = cache(getCurrentUserCache);


export async function getSession(): Promise<Session | null> {
  try {
    const supabase = await createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
}

export async function updateProfile(
  userId: string,
  updates: Partial<Omit<Profile, "id" | "email" | "created_at" | "updated_at">>
): Promise<AuthResponse<Profile>> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: data as Profile,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
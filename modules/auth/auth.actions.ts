"use server";

import { api } from "@/lib/eden";
import { AuthSignInBody, AuthSignUpBody } from "./auth.model";
import { SerializedApiError } from "@/lib/error/error";

type ActionResult<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

export async function signUpEmailAction(
  data: AuthSignUpBody
): Promise<ActionResult<unknown, unknown>> {
  try {
    const result = await api.auth.signup.post({ ...data, asResponse: true });

    if (result.error) {
      return { success: false, error: result.error.value };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Failed to sign up:", error);
    return { success: false, error: "Failed to sign up" };
  }
}

export async function signInEmailAction(
  data: AuthSignInBody
): Promise<ActionResult<unknown, SerializedApiError>> {
  try {
    const result = await api.auth.signin.post(data);

    if (result.error) {
      return {
        success: false,
        error: {
          message: result.error.value.message || "",
        },
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Failed to sign in:", error);
    return { success: false, error: { message: "Failed to sign in" } };
  }
}

export async function signOutAction() {
  try {
    const result = await api.auth.signout.post();

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Failed to sign out:", error);
    return { success: false, error: "Failed to sign out" };
  }
}

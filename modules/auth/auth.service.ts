import { auth } from "@/lib/auth";
import { AuthSignInBody, AuthSignUpBody } from "./auth.model";
import { ApiError } from "@/lib/error/error";

export abstract class AuthService {
  static async signUp(data: AuthSignUpBody) {
    const response = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      asResponse: true,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new ApiError(
        response.status,
        errorData.message || "Signup failed",
        errorData.code,
        errorData.items
      );
    }
    return response;
  }

  static async signIn(data: AuthSignInBody): Promise<Response> {
    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      asResponse: true,
    });
    return response;
  }

  static async signOut(): Promise<Response> {
    const response = await auth.api.signOut({
      headers: {},
      asResponse: true,
    });
    return response;
  }
}

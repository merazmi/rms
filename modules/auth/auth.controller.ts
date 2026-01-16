import { errorHandlerPlugin } from "@/lib/error/error-handler-plugin";
import { Elysia } from "elysia";
import { AuthDto } from "./auth.model";
import { AuthService } from "./auth.service";

export const authController = new Elysia({ prefix: "/auth" })
  .use(errorHandlerPlugin)
  .post("/signup", async ({ body }) => await AuthService.signUp(body), {
    body: AuthDto.signUpBody,
  })
  .post("/signin", async ({ body }) => await AuthService.signIn(body), {
    body: AuthDto.signInBody,
  })
  .post("/signout", async () => await AuthService.signOut())
  .get("/session", async ({ request }) => await AuthService.getSession(request));

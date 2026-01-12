import { z } from "zod";

export const AuthDto = {
  signUpBody: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    asResponse: z.optional(z.boolean()),
  }),
  signUpResponse: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    token: z.optional(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  signInBody: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
  signInResponse: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    token: z.optional(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
};

export type AuthSignUpBody = z.infer<typeof AuthDto.signUpBody>;
export type SignUpResponse = z.infer<typeof AuthDto.signUpResponse>;
export type AuthSignInBody = z.infer<typeof AuthDto.signInBody>;
export type SignInResponse = z.infer<typeof AuthDto.signInResponse>;

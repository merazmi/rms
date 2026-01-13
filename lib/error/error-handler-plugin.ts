import { Elysia } from "elysia";
import { ApiError } from "./error";

export const errorHandlerPlugin = (app: Elysia) =>
  app
    .decorate("log", {
      info: (msg: string) => console.log("\x1b[32mℹ️", msg, "\x1b[0m"),
      error: (msg: string) => console.error("\x1b[31m❌", msg, "\x1b[0m"),
    })
    .error({ API_ERROR: ApiError })
    .onError(({ error, code, set }) => {
      switch (code) {
        case "API_ERROR":
          set.status = error.statusCode;
          return {
            statusCode: error.statusCode,
            rawCode: error.rawCode,
            message: error.message,
            items: error.items || [],
          };
        default:
          return {
            statusCode: 500,
            message:
              "message" in error ? error.message : "Internal Server Error",
          };
      }
    });

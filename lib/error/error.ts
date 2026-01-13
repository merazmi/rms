export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public rawCode?: string,
    public items?: string[]
  ) {
    super(message);
    this.name = "ApiError";
  }
}

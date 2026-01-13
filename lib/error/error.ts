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
  toJSON(): SerializedApiError {
    return {
      statusCode: this.statusCode,
      message: this.message,
      rawCode: this.rawCode,
      items: this.items,
    };
  }
}

export type SerializedApiError = {
  statusCode?: number;
  message: string;
  rawCode?: string;
  items?: string[];
};

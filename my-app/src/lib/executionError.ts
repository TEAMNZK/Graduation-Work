export class ExecutionServiceError extends Error {
  constructor(
    public readonly code: "EXECUTION_TIMEOUT" | "EXECUTION_UNAVAILABLE",
    message: string,
    public readonly details: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ExecutionServiceError";
  }
}

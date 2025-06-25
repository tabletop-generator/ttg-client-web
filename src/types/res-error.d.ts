export interface ResponseError extends Error {
  info: unknown;
  status: number;
}

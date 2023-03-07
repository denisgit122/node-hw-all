export interface IError extends Error {
  status: number;
}
export interface IMessage {
  message: string;
}

export interface ICommontResponse<T> extends IMessage {
  data: T;
}

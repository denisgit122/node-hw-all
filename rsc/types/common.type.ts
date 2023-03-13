export interface IError extends Error {
  status: number;
}
export interface IMessage {
  message: string;
}

export interface ICommontResponse<T> extends IMessage {
  data: T;
}
interface IIndex {
  [key: string]: any;
}
//типізуємо що в IRequest ключем може бути певна стрінга
export type IRequest = IIndex;

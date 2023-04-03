import { Model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  gender: string;
  age: number;
  avatar?: string;
}

export interface IUserMethods {
  nameWithAge(): void;
}
export interface IUserVirtuals {
  nameWithSurname: string;
}
// переписуємо інтерфейс звичайної модельки
export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByName(name: string): Promise<IUser[]>;
}

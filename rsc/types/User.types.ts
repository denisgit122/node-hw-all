export enum EGender {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  gender: string;
}

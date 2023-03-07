export enum EGender {
  male = "male",
  femail = "femail",
  mixed = "mixed",
}

export interface IUser {
  name: string;
  password: string;
  email: string;
  gender: string;
}


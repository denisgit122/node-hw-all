export enum EmailActions {
  WELCOME,
  FORGOT_PASSWORD,
}

export const allTemplates = {
  [EmailActions.WELCOME]: {
    subject: "Great sea you in out app!",
    templateName: "register",
  },
  [EmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control your password just follower all and everything will be good",
    templateName: "forgotPassword",
  },
};

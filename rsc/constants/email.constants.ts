export enum EmailActions {
  WELCOME,
  FORGOT_PASSWORD,
  ACTIVATE,
  RENIDER,
}

// export const allTemplates = {
//   [EmailActions.WELCOME]: {
//     subject: "Great sea you in out app!",
//     templateName: "register",
//   },
//   [EmailActions.FORGOT_PASSWORD]: {
//     subject:
//       "We control your password just follower all and everything will be good",
//     templateName: "forgotPassword",
//   },
// };
export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EmailActions.WELCOME]: {
    subject: "Great to see you in our app!",
    templateName: "register",
  },
  [EmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control your password, just follow all steps and everything will be good",
    templateName: "forgotPassword",
  },
  [EmailActions.ACTIVATE]: {
    subject: "Activate!",
    templateName: "activate",
  },
};

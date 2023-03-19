"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTemplates = exports.EmailActions = void 0;
var EmailActions;
(function (EmailActions) {
    EmailActions[EmailActions["WELCOME"] = 0] = "WELCOME";
    EmailActions[EmailActions["FORGOT_PASSWORD"] = 1] = "FORGOT_PASSWORD";
    EmailActions[EmailActions["ACTIVATE"] = 2] = "ACTIVATE";
})(EmailActions = exports.EmailActions || (exports.EmailActions = {}));
exports.allTemplates = {
    [EmailActions.WELCOME]: {
        subject: "Great to see you in our app!",
        templateName: "register",
    },
    [EmailActions.FORGOT_PASSWORD]: {
        subject: "We control your password, just follow all steps and everything will be good",
        templateName: "forgotPassword",
    },
    [EmailActions.ACTIVATE]: {
        subject: "Activate!",
        templateName: "activate",
    },
};

import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import * as path from "path";

import { confi } from "../configs";
import { allTemplates, EmailActions } from "../constants/email.constants";

// create claas which sent email
class EmailService {
  // для того щоб слати емейли треба створити транспортер який буде цим займатися
  private transporter: Transporter;
  private templateParcer;
  constructor() {
    this.transporter = nodemailer.createTransport({
      //    тут є багато опцій але ми будемо слати емейл через гмейл то робимо так
      service: "gmail",
      auth: {
        //  назви не міняємо
        user: confi.NO_REPLY_EMAIL,
        //  щоб ввести пасс треба зайти в емеіл - керувати - безпека - двох етапна перевірка
        pass: confi.NO_REPLY_PASSWORD,
      },
    });
    this.templateParcer = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "rsc", "statics"),
        options: {
          extension: "hbs",
        },
      },
      //juice це бібліотека для того щоб css стилі вбудовувати
      juice: true,
      juiceResources: {
        webResources: {
          //relativeTo це шлях до папки де будуть наші стилі
          relativeTo: path.join(process.cwd(), "src", "statics", "css"),
        },
      },
    });
  }
  public async sendMail(
    email: string | string[],
    emailAction: EmailActions,
    locals: Record<string, string> = {}
  ) {
    try {
      const templateInfo = allTemplates[emailAction];
      locals.frontUrl = confi.FRONT_URL;
      const html = await this.templateParcer.render(
        templateInfo.templateName,
        locals
      );

      return this.transporter.sendMail({
        from: "no reply",
        // to до кого емейл буде відправляти
        to: email,
        // subject умовно наша емейл
        subject: templateInfo.subject,
        html,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}
export const emailService = new EmailService();

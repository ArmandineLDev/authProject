import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.WEB_SERVER}/auth/new-verification?token=${token}`;
  console.log(confirmLink);

  if (!process.env.RESEND_FROM) return false;

  await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: email,
    subject: "Auth - Confirm your mail",
    html: ` <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

import { render } from "@react-email/components";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  emailFrom?: string;
  emailTo: string;
  subject: string;
  content?: React.ReactNode;
}

export const sendEmail = async ({
  emailFrom,
  emailTo,
  content,
  subject,
}: SendEmailParams) => {
  const { data: emailData, error } = await resend.emails.send({
    from: emailFrom || process.env.RESEND_FROM_EMAIL || "no-reply@merazmi.com",
    to: [emailTo],
    subject,
    html: await render(content || null),
  });

  // TODO: ADD LOGGER HERE
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", emailData);
  }

  return { emailData, error };
};

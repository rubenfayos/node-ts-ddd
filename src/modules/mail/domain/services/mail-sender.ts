export interface MailSender {
  sendMail(params: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void>;
}

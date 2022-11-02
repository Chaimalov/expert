import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendEmail(email, subject, message) {
  const msg = {
    to: email,
    from: "expirebyexpert@gmail.com",
    subject,
    html: message,
  };
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}

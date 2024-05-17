import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const sendEmail = (email: string, subject: string, message: string) => {
  console.log("------sending email------");
  const msg = {
    to: email,
    from: "expirebyexpert@gmail.com",
    subject,
    html: message,
  };
  sgMail.send(msg).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

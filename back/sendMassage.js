import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "chaimalov@gmail.com",
  from: "expirebyexpert@gmail.com",
  subject: "experts alerts",
  text: "your products getting expired",
  html: "<strong>its in process</strong>",
};

export function sender() {
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

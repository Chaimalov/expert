import sgMail from "@sendgrid/mail";

console.log(process.env.TEST);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "israelmark98@gmail.com",
  from: "expirebyexpert@gmail.com", 
  subject: "experts alerts",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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

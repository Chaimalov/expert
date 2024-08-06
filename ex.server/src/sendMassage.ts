import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) throw new Error("no api key has been found for sendgrid");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail =  (email: string, subject: string, message: string) => {
  console.log("------sending email------");
  const msg = {
    to: email,
    from: process.env.COMPANY_MAIL,
    subject,
    html: message,
  };
  try{
    const response = sgMail.send(msg);
    console.log(response);

  }
  catch (error) {
    if(error.response){
      console.error(error.response.body);
    }
    else {
      console.error(error);
    }
  }
};

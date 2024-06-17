import nodemailer from "nodemailer"

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'damien.audrezet@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

/** create reusable sendmail function 
@params {object} options - mail options (to, subject, text, html)
@params {function} callback - callback function to handle response
*/
export const SENDMAIL = async (mailDetails:any, callback:any) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(info);
  } catch (error) {
    throw new Error();
  }
};
const sgMail = require("@sendgrid/mail");

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const mail = { ...data, from: "antoxad0887@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;

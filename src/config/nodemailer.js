const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASSWORD_MAILER,
  },
});

const mailOptions = ({ email, password }) => {
  return {
    from: process.env.USER_MAILER,
    to: email,
    subject: "Nueva cuenta en Projects RTC",
    html: getHTML({ email, password }),
  };
};

const getHTML = ({ email, password }) => {
  return `
        <div>
            <h2>Ya tienes cuenta en Proyects RTC!</h2>
            <h4>Tu usuario: ${email}</h4>
            <h4>Tu contraseña: ${password}</h4>
            <a href="#">Entrar y cambiar contraseña</a>
            <footer style="margin: 100px">
              <img src="https://storage.googleapis.com/payhawk-website/images/000/003/265/image/Logo%20ThePowerBusiness%20School.png" width="200px"/>
            </footer>
        </div>
    `;
};

const sendEmail = ({ email, password }) => {
  transporter.sendMail(
    mailOptions({ email, password }),
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo electrónico enviado: " + info.response);
      }
    }
  );
};

module.exports = { sendEmail }
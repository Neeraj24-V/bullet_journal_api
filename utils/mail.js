const nodemailer = require("nodemailer");

const mailSender = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      Port: 587,
      auth: {
        user: `lijo-org@hotmail.com`,
        pass: `bUjO-orG@00`,
      },
    });

    let mailOptions = {
      from: "lijo-org@hotmail.com",
      to: "sriramvirodula@gmail.com",
      subject: "LIJO Email Service Test",
      text: "This is a text mail",
      html: `<div>
        <h2>LIJO</h2>
        <p>This is an HTML based email sent through the LIJO Email Service.</p>
        <p>Thanks for registering to the journal.</P>
      </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.log(err.message);
  }
};

// mailSender();

module.exports = mailSender;

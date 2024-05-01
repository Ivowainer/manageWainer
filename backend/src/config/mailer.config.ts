import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
    },
});

/* transporter.verify().then(() => {
    console.log("Ready for send emails!");
}); */

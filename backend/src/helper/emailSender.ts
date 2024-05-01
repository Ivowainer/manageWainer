import { transporter } from "../config/mailer.config";

export const emailSender = async (email: string, token: string) => {
    await transporter.sendMail({
        from: '"ManageWainer" <managewainer@gmail.com>',
        to: email,
        subject: "Confirm email",
        html: `<div style="display: block; max-width: 20rem; padding: 1rem; background-color: white; border: 1px solid #cccccc; border-radius: 0.5rem; " >
                <h5 style="margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: bold; letter-spacing: 0.1rem; color: #212529;">
                    ManageWainer
                </h5>
                <p style="font-weight: normal; color: #6C757D;">
                    Please confirm your ManageWainer account with the following link.
                </p>
                <a
                    href="${process.env.FRONTEND_URL}/confirm/${token}"
                    style="font-weight: normal; color: #3b82f6; text-decoration: underline;"
                >
                    Here!
                </a>
            </div>`,
    });
};

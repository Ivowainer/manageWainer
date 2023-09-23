import bcrypt from "bcryptjs";

export const verificationPassword = async (passwordForm: string, passwordUser: string) => {
    return await bcrypt.compare(passwordForm, passwordUser);
};

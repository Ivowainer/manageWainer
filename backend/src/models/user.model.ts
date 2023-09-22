import { Model, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

import { IUser } from "../types/user.type";

const userModel = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        confirmed: { type: String, required: true, default: false },
        exptoken: { type: String, required: true, default: "" },
        projects: { type: Schema.Types.ObjectId, ref: "Project" },
    },
    {
        timestamps: true,
    }
);

userModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userModel.methods.verificationPassword = async function (passwordForm: string) {
    return await bcrypt.compare(passwordForm, this.password);
};

const User: Model<IUser> = models.User || model("User", userModel);

export default User;

import { Model, Schema, model, models } from "mongoose";
import { IUser } from "../types/user.type";

const userModel = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        mail: { type: String, required: true },
        password: { type: String, required: true },
        confirmed: { type: String, required: true },
        exptoken: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

userModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt;
});

const User: Model<IUser> = models.User || model("User", userModel);

export default User;

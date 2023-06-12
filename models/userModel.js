import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            minLength: 8,
            required: true,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
            default: "https://gravatar.com/avatar/7062c0ad42902d609aa2b5069d561a69?s=400&d=robohash&r=x",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
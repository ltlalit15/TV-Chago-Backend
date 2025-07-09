import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,

        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);


const Auth = mongoose.model("User", authSchema);

export default Auth;

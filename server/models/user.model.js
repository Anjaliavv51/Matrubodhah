import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        picture: {
            type: String,
            required: false
        },
        dob: {
            type: Date,
            required: false
        },
        age: {
            type: Number,
            required: false,
            default: function () {
                if (this.dob) {
                    const ageDifMs = Date.now() - new Date(this.dob).getTime();
                    const ageDate = new Date(ageDifMs);
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                }
                return null;
            }
        },
        accountCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salts = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salts)
        }
    } catch (error) {
        return next(error)
    }

    next()
})

const User = mongoose.model("User", userSchema);

export { User };
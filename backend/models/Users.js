import {isEmail} from "validator";
import mongoose from "mongoose";
const { Schema } = mongoose;
// import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email required, Please enter an email"],
            lowercase: true,
            unique: [true, "Email already exists"],
            validate: [isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password required, please enter a password"],
            minlength: [6, "Minimum password length is 6 characters"],
        },
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        lastLoginAt: {
            type: Date,
            default: null
        },
        refreshToken: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        };
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

// userSchema.pre('save', async function (next){
//     // console.log('before save: ', this)
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//     next();
// });

userSchema.post('save', (doc, next) => {
    // console.log('after save : ', doc)
    next();
})

export const User = mongoose.model("User", userSchema);

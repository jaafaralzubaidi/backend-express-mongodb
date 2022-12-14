import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";



const UserSchema: Schema = new Schema(
    {
        fName: { type: String, require: true },
        lName: { type: String, require: true },
        state: { type: String, require: true },
        city: { type: String, require: true }

    }
);


export default mongoose.model<IUser>('User', UserSchema)
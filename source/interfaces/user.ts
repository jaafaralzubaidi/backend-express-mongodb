import { Document } from "mongoose";

export default interface IUser extends Document {
    fName: string;
    lName: string;
    city: string;
    state: string;
}
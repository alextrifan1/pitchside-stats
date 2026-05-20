import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    favoriteTeams: number[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        favoriteTeams: {
            type: [Number],
            default: []
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
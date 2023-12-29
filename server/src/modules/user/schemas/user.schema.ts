import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";
import mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema({
    versionKey: false,
    timestamps: {
        updatedAt: false,
        createdAt: "registrationDate",
    }
})
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val: string) => /\S+@\S+\.\S+/.test(val),
            message: "E-mail format is not valid."
        }
    })
    email!: string;
    
    @Prop({
        type: String,
        required: true,
        minlength: [3, "Display name must be longer than 3 characters."],
        maxlength: [32, "Display name must be shorter than 32 characters."],
    })
    displayName!: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Slug must be longer than 3 characters."],
        maxlength: [32, "Slug must be shorter than 32 characters."],
        validate: {
            validator: (val: string) => /^[a-z0-9-]+$/i.test(val),
            message: "Slug format is not valid."
        },
    })
    slug!: string;

    @Prop({
        type: String,
        minlength: [6, "Password must be longer than 6 characters."],
        required: true,
        select: false,
        set: (val: string) => {
            return val.length < 6 ? val : bcrypt.hashSync(val, 10)
        }
    })
    password!: string;

    @Prop({
        type: String,
        required: false,
        default: "",
        maxlength: [300, "Biography must be shorter than 300 characters."],
    })
    biography!: string;

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "Link" }] })
    links!: [];

    @Prop({
        type: String,
        required: false
    })
    profilePhoto!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

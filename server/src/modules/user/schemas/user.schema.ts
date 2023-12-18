import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = User & Document;

type Link = {
    title: string;
    url: string;
    description: string;
}

@Schema({
    versionKey: false,
    timestamps: {
        updatedAt: false,
        createdAt: 'registrationDate',
    }
})
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val: string) => /\S+@\S+\.\S+/.test(val),
            message: 'E-mail format is not valid.'
        }
    })
    email!: string;
    
    @Prop({
        type: String,
        required: true,
        minlength: [3, 'Display name must be longer than 3 characters.'],
        maxlength: [32, 'Display name must be shorter than 32 characters.'],
    })
    displayName!: string;

    @Prop({
        type: String,
        required: true,
        set: (val: string) => {
            return val.length < 6 ? val : bcrypt.hashSync(val, 10)
        }
    })
    password!: string;

    @Prop({
        type: String,
        required: true,
        minlength: [3, 'Description must be longer than 3 characters.'],
        maxlength: [32, 'Description must be shorter than 32 characters.'],
    })
    description!: string;

    @Prop({
        type: Array<Link>,
        required: false,
    })
    links!: Array<Link>;

    @Prop({
        type: String,
        required: false
    })
    profilePhoto?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

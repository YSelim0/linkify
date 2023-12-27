import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LinkDocument = Link & Document;

@Schema({
    versionKey: false,
    timestamps: {
        updatedAt: false
    }
})
export class Link {
    @Prop({
        type: String,
        maxlength: [150, "Title must be shorter than 150 characters."]
    })
    title!: string;

    @Prop({
        type: String,
        maxlength: [300, "Description must be shorter than 300 characters."]
    })
    description!: string;

    @Prop({
        type: String
    })
    url!: string;

    @Prop({
        type: String
    })
    photoUrl!: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

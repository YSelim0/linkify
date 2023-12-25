import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

type LinkDocument = Link & Document;

@Schema({
    versionKey: false,
    timestamps: {
        updatedAt: false
    }
})
export class Link {
    @Prop({
        type: String,
        maxlength: [200, "Title must be shorter than 200 characters."]
    })
    title!: string;

    @Prop({
        type: String,
        maxlength: [500, "Description must be shorter than 500 characters."]
    })
    description!: string;

    @Prop({
        type: String
    })
    url!: string;

    @Prop({
        type: String
    })
    photo!: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

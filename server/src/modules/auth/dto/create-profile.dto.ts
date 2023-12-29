import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateProfileDTO {
    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(3)
    @MaxLength(32)
    displayName!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    @MinLength(3)
    @MaxLength(32)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be lower kebab case" })
    slug!: string;

    @IsString()
    @MaxLength(300)
    biography?: string = "";
}

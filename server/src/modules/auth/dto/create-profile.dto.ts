import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

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
    @MaxLength(300)
    description?: string = "";
}

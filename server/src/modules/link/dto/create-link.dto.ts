import { IsJWT, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateLinkDTO {
    @IsJWT()
    @IsString()
    jwtUserId!: string;
    
    @IsString()
    @MaxLength(150)
    title!: string;

    @IsString()
    @MaxLength(300)
    description!: string;
    
    @IsString()
    @IsUrl()
    url!: string;
}
import { IsJWT, IsMongoId, IsOptional, IsString } from "class-validator";

export class UpdateLinkDTO {
    @IsMongoId()
    @IsString()
    linkId!: string;

    @IsJWT()
    @IsString()
    jwtUserId!: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    url?: string;
}

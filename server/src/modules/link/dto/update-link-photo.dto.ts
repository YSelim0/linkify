import { IsJWT, IsMongoId, IsString } from "class-validator";

export class UpdateLinkPhotoDTO {
    @IsString()
    @IsMongoId()
    linkId!: string;

    @IsString()
    @IsJWT()
    jwtUserId!: string;
}

import { IsJWT, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class DeleteLinkDTO {
    @IsNotEmpty()
    @IsMongoId()
    @IsString()
    linkId!: string;

    @IsNotEmpty()
    @IsJWT()
    @IsString()
    jwtUserId!: string;
}

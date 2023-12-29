import { IsJWT, IsString } from "class-validator";

export class UpdateUserPhotoDTO {
    @IsJWT()
    @IsString()
    jwtUserId!: string;
}

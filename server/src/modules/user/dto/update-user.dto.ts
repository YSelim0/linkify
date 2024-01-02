import { Theme } from "@common/enums/theme.enum";
import { IsEnum, IsJWT, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsJWT()
    @IsString()
    jwtUserId!: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(32)
    displayName?: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(32)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be lower kebab case" })
    slug?: string;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    biography?: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsString()
    @IsOptional()
    @IsEnum(Theme)
    theme?: string;
}

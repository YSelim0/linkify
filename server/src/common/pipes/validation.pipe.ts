import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorMessages: string[] = [];

      errors.forEach((err: any) => {
        Object.keys(err.constraints).forEach((key) => {
          errorMessages.push(err.constraints[key]);
        });
      });
      throw new BadRequestException(errorMessages);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

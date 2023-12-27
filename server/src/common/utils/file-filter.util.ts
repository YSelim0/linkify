import { BadRequestException } from '@nestjs/common'
import { Request } from 'express'

export const fileFilter = (mimeTypes: string[]) => {
  return (
    req: Request,
    file: Express.Multer.File,
    cb: (err: Error | null, success: boolean) => void
  ) => {
    if (!mimeTypes.includes(String(file.mimetype).toLowerCase())) {
      return cb(new BadRequestException('File format not supported.'), false)
    }
    return cb(null, true)
  }
}

import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg' | 'image/webp';

const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
];

export const storage = (dest: string) => {
  return {
    storage: diskStorage({
      destination: dest,
      filename: (req: Request, file: Express.Multer.File, cb) => {
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`);
      },
    }),
    fileFilter: (req: Request, file, cb) => {
      if (file.fieldname === 'image') {
        const allowedMimeTypes: validMimeType[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimetype)
          ? cb(null, true)
          : cb(null, false);
      } else {
        cb(null, true);
      }
    },
  };
};

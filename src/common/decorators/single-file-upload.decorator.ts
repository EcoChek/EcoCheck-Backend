import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const SingleFileUploadDecorator = UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename(_req, file, callback) {
                const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
                callback(null, filename);
            }
        }),
        limits: {
            fileSize: 5_000_000,
            fieldNameSize: 100
        }
    })
);

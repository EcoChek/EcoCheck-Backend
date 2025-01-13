import { UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function MultiFileUploadDecorator(maxFiles: number) {
    return UseInterceptors(
        FilesInterceptor('files', maxFiles, {
            storage: diskStorage({
                destination: './uploads',
                filename(_req, file, callback) {
                    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
                    callback(null, filename);
                }
            }),
            limits: {
                fileSize: 50_000_000,
                fieldNameSize: 100
            }
        })
    );
}

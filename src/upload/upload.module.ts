import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'multer.config';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
    providers: [UploadService, UsersService, AuthService],
    imports: [MulterModule.register(MulterConfig)],
    exports: [UploadService],
    controllers: [UploadController]
})
export class UploadModule {}

import { Body, Controller, HttpCode, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDTO } from 'src/users/user-dto';
import { UploadService } from './upload.service';
import { Roles } from 'src/users/role.decorator';
import { UserRole } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService){}

    //Nur Admin und PremiumUser können ein Profilbild hochladen
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.PREMIUMUSER)
    @Post('uploadPicture')
    @UseInterceptors(FileInterceptor('file'))  
    uploadPicture(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.uploadPicture(file)
    }
}

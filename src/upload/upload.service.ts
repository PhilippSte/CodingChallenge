import { Injectable } from '@nestjs/common';
import { Image } from 'image-js';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UploadService {
    constructor(private authService: AuthService, private userService: UsersService ){}

    async uploadPicture(file){
        const newPath = `./uploads/${file.originalname}_scaled.jpg`;
        await Image.load(file.buffer).then(image => {
            const resizedImage = image.resize({ width: 200, height: 200 });
            resizedImage.save(newPath);
          });
        this.userService.addProfilPicture(newPath, this.authService.getCurrentUserName())
        return { message: 'Datei erfolgreich hochgeladen', path: newPath };
    }
}

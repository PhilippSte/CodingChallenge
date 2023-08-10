import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { loginDTO } from 'src/auth/login-dto';
import { UserDTO } from './user-dto';
import { UserRole, UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from './role.decorator';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    //CREATEUSER
    @HttpCode(HttpStatus.OK)
    @Post('create')
    create(@Body() userDto: UserDTO) {
        return this.userService.createUser(userDto)
    }

    //DELETEUSER
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    delete(@Body() user: UserDTO) {
        return this.userService.deleteUser(user.username)
    }

    //EDITUSER
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('edit')
    edit(@Body() userDto: UserDTO) {
        console.log(userDto)
        return this.userService.editUser(userDto)
    }

    //EDITROLE
    //changeRoleParams: { id: number, role: string }
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN)
    @Post('editRole')
    setUserRole(@Body() changeRoleParams){
        return this.userService.editRoleOfUser(changeRoleParams)
    }
}

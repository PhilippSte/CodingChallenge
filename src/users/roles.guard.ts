
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, UsersService } from './users.service';
import { ROLES_KEY } from './role.decorator';
import { AuthService } from 'src/auth/auth.service';

//RolesGuard, nötig um Zugriff auf Endpunkte zu gewährleisten oder verbieten.

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService, private userService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    let currentUserRole;
    if(!this.authService.getCurrentUserName()){
        currentUserRole = ""
    }
    else{
        currentUserRole = this.userService.getRoleOfUser(this.authService.getCurrentUserName()) 
    }
    return requiredRoles.some((role) => role === currentUserRole);
  }
}

import { UserRole } from "./users.service";

export interface UserDTO{
    username: string,
    lastName?: string,
    firstName?: string,
    email?: string,
    password?: string,
}
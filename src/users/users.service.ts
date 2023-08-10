import { Injectable } from '@nestjs/common';
import { UserDTO } from './user-dto';

export enum UserRole {
    "ADMIN",
    "USER",
    "PREMIUMUSER"
}

// Im Normalfall definier ich den User als Klasse bzw. Entity, deswegen nochmal die Trennung zwischen User und UserDTO, obwohl diese (fast) identisch sind.
export interface User{
    id: number,
    username: string,
    lastName: string,
    firstName: string,
    email: string,
    role: UserRole,
    password: string,
    profilePicPath?: string
}


@Injectable()
export class UsersService {

    private exampleUsers = [
        {
            id:1,
            username: "admin",
            lastName: "Steiger",
            firstName: "Philipp",
            email: "123@123.de",
            role: UserRole.ADMIN,
            password: "admin",
            profilePicPath: ""
        },
        {
            id:2,
            username: "user",
            lastName: "Stei",
            firstName: "ger",
            email: "1234@123.de",
            role: UserRole.USER,
            password: "user",
            profilePicPath: ""
        },
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.exampleUsers.find(user => user.username === username);
    }

    // User hinzufügen
    createUser(userdto: UserDTO){
        if(this.exampleUsers.find(user => user.username === userdto.username)){
            return { message: 'Ein User mit dem Usernamen existiert schon!'}
        }
        this.exampleUsers.push(this.mapUserDTOtoUser(userdto))
    }

    // User löschen
    deleteUser(username){
        this.exampleUsers = this.exampleUsers.filter(user => user.username !== username )
    }

    // User editieren
    editUser(userdto: UserDTO){
        this.exampleUsers.filter((user) => user.username === userdto.username).map(user => {
            //Partial Update auf den User
            Object.assign(user, userdto)
        })
        console.log(this.exampleUsers)
    }

    // Get Role by Username
    getRoleOfUser(username:string){
        return this.exampleUsers.filter(user=> user.username === username)[0].role
    }

    // Ändern einer Rolle
    editRoleOfUser(changeRoleParams){
        this.exampleUsers.filter((user) => user.id === changeRoleParams.id).map(user => {
            user.role = this.assignRoleFromString(changeRoleParams.role)
        })
    }

    // Hinzufügen des Profilbildpfades zum User
    addProfilPicture(path, username){
        this.exampleUsers.map(user => {
            if(user.username !== username) return
            user.profilePicPath = path
        })
    }

    // Hilfsfunktion um Role-String in Role-Enum umzuwandeln
    assignRoleFromString(role:string){
        switch(role){
            case "admin": return UserRole.ADMIN
            case "user": return UserRole.USER
            case "premiumUser": return UserRole.PREMIUMUSER
        }
    }

    // Hilfsfunktion. Im Falle einer persistenten Datenerhaltung würde ich die Mappingfunktion direkt an die Entityklasse mit dranhängen.
    mapUserDTOtoUser(user: UserDTO){
        return {
            id: this.exampleUsers.length+1,
            username: user.username,
            lastName: user.lastName || undefined,
            firstName: user.firstName || undefined,
            email: user.email || undefined,
            role: UserRole.USER,
            password: user.password || "",
            profilePicPath: ""
        }
    }
}

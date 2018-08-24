import { Role } from '../user'

export class Token {
    token: string;
}

export class UserRegister {
    id: string;
    username: string;
    email: string;
    roles: Array<Role>
}

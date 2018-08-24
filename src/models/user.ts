export class User {
    username: string;
    email: string;
    roles: Array<Role>;
    sessionTimeout: number;
    jwt: string;
}

export class Role {
    role: string;
    level: number;
}

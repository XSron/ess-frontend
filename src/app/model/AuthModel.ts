import { RoleModel } from '../model/RoleModel';

export interface AuthModel {
    username: string,
    roles: RoleModel[],
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    expireIn: string;
    scope: string;
    jti: string
}
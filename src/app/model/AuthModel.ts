import { RoleModel } from '../model/RoleModel';

export interface AuthModel {
    access_token: string,
    token_type: RoleModel[],
    refresh_token: string;
    expires_in: string;
    scope: string;
    privileges: string;
    user_id: string;
    jti: string;
}
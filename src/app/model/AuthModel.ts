export interface AuthModel {
    access_token: string,
    token_type: string,
    refresh_token: string;
    expires_in: string;
    scope: string;
    privileges: string;
    user_id: string;
    jti: string;
}
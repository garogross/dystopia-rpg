export interface AuthUserResponse {
    status: string,
    token: string,
    user: {
        first_name: string,
        id_tgrm: string,
        last_name: string,
        username: string,
    }
}
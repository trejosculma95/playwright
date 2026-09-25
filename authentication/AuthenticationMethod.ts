export interface AuthenticationMethod {
    authenticate(
        username: string,
        password: string
    ): Promise<void>;
}
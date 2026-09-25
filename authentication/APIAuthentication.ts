import { AuthenticationMethod } from "./AuthenticationMethod";
import { AuthenticationApi } from "../api/AuthenticationApi"

export class APIAuthentication implements AuthenticationMethod {

    constructor(private readonly apiService: AuthenticationApi) {}

    async authenticate(
        username: string,
        password: string
    ): Promise<void> {
        await this.apiService.login(username, password)
    }
}
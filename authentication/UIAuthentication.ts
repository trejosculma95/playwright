import { AuthenticationMethod } from "./AuthenticationMethod";
import { LoginPage } from "../pages/loginPage";

export class UIAuthentication implements AuthenticationMethod {

    constructor(private readonly loginPage: LoginPage) {}

    async authenticate(
        username: string,
        password: string
    ): Promise<void> {
        await this.loginPage.goto()
        await this.loginPage.login(username, password)
    }
}
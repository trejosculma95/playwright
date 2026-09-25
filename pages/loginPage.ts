import { Page, Locator } from '@playwright/test'

export class LoginPage{

    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameInput = page.getByLabel('Username')
        this.passwordInput = page.getByLabel('Password')
        this.loginBtn = page.getByRole('button', {name: "Login"})
    }

    async goto(): Promise<void>{
        await this.page.goto("/")
    }

    async login(username: string, password: string): Promise<void>{
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginBtn.click()
    }

}
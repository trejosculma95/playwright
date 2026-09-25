export interface TestUser {
    userName: string;
    password: string;
    authFile: string;
}

export const users = {
    standard: {
        userName: 'standard_user',
        password: 'secret_sauce',
        authFile: 'playwright/.auth/standard-user.json',
    },
    visual: {
        userName: 'visual_user',
        password: 'secret_sauce',
        authFile: 'playwright/.auth/visual-user.json',
    }
}
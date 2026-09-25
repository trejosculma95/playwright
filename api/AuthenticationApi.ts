import { APIRequestContext, APIResponse } from "@playwright/test";

export interface LoginRequest {
    userName: string;
    password: string;
}

export class AuthenticationApi {

    constructor(
        private readonly request: APIRequestContext
    ) {}

    async getToken(userLogin: LoginRequest): Promise<APIResponse> {
        return this.request.post('/auth/login', {
            data: userLogin
        });
    }

    async login(userName: string, password: string){
        
    }
}
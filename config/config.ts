import dotenv from 'dotenv';
import {
    environments,
    Environment
} from './environments';

dotenv.config({
    path: '.env.local'
});

type AuthenticationMode = 'ui' | 'api';

function getAuthenticationMode(): AuthenticationMode {
    const mode = process.env.AUTH_MODE;

    if (mode !== 'ui' && mode !== 'api') {
        throw new Error(
            `Invalid AUTH_MODE: ${mode}. Expected "ui" or "api".`
        );
    }

    return mode;
}

function getEnvironment(): Environment {
    const environment = process.env.TEST_ENV ?? 'local';

    if (!(environment in environments)) {
        throw new Error(
            `Invalid TEST_ENV: ${environment}. ` +
            `Expected one of: ${Object.keys(environments).join(', ')}.`
        );
    }

    return environment as Environment;
}

const environment = getEnvironment();

export const config = {
    environment,
    baseURL: environments[environment].base,
    apiBaseURL: environments[environment].apiBase,
    authenticationMode: getAuthenticationMode()
};

export const credentials = {
    visualUser: {
        userName: process.env.VISUAL_USER_USERNAME ?? '',
        password: process.env.VISUAL_USER_PASSWORD ?? '',
    },

    editorUser: {
        userName: process.env.EDITOR_USER_USERNAME ?? '',
        password: process.env.EDITOR_USER_PASSWORD ?? '',
    },
};
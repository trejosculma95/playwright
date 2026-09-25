import { mergeTests } from '@playwright/test';
import { apiTest } from './api.fixture';
import { authTest } from './auth.fixture';

export const test = mergeTests(
    apiTest,
    authTest
);
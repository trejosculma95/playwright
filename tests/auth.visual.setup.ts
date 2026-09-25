import { test as setup } from '@playwright/test';
import { users } from '../data/users';
import { authenticateUser } from '../utils/authenticateUser';

setup('authenticate visual user', async ({ page }) => {
    await authenticateUser(page, users.visual);
});
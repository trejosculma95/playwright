import { test as base } from '@playwright/test';

import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";

type UIFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const UITest = base.extend<UIFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage)
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage)
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage)
  },
});
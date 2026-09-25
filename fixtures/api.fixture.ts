import { test as base } from '@playwright/test'
import { ProductsApi } from "../api/ProductsApi";
import { Environment, environments } from '../config/environments';

const environment = (process.env.TEST_ENV || 'local') as Environment;

type ApiFixtures = {
  productsApi: ProductsApi;
};

export const apiTest = base.extend<ApiFixtures>({
productsApi: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: environments[environment].apiBase,
    });
    const productsApi = new ProductsApi(request);

    await use(productsApi);

    await request.dispose();
  }
});
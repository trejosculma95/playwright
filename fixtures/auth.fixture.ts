import { AuthenticationApi } from '../api/AuthenticationApi';
import { AuthenticationMethod } from '../authentication/AuthenticationMethod';
import { UITest } from './ui.fixture';

import { config } from '../config/config';
import { UIAuthentication } from '../authentication/UIAuthentication';
import { APIAuthentication } from '../authentication/APIAuthentication';

type AuthFixtures = {
  authentication: AuthenticationMethod;
};

export const authTest = UITest.extend<AuthFixtures>({
  authentication: async ({ loginPage, request }, use) => {

    const authenticationApi = new AuthenticationApi(request);

    let authentication: AuthenticationMethod;

    if (config.authenticationMode === 'ui') {
      authentication = new UIAuthentication(loginPage);
    } else {
      authentication = new APIAuthentication(authenticationApi);
    }

    await use(authentication);
  },
});
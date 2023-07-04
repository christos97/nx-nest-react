import { ApiResources } from '@ntua-saas-10/shared-api-interfaces';

interface ApiSDKConfig {
  apiKey: string;
}

export class ApiSDK {
  private readonly apiKey!: string;
  constructor({ apiKey }: ApiSDKConfig) {
    const apiKeyExistsInEnv = process.env['SDK_API_KEY'] || this.apiKey || false;
    if (apiKeyExistsInEnv === false) {
      this.apiKey = apiKey;
      process.env['SDK_API_KEY'] = apiKey;
      if (apiKey.startsWith('sdk_test_')) {
        process.env['SDK_SANDBOX_MODE'] = 'true';
      }
    }
  }

  get users() {
    return ApiResources['users'];
  }
}

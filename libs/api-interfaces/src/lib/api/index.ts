import resources from './resources.api';
import services from './services.api';

export const ApiLookup = {
  resources,
  services,
} as const;

export { I18nService } from './services.api';
export default ApiLookup;

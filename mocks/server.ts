// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

import 'cross-fetch/polyfill';

export const server = setupServer(...handlers);
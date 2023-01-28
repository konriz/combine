import { bootstrap as bootstrapGraphQL } from './graphQLApp.js';
import * as config from '../config/index.js';
import { log } from '../logging.js';

bootstrapGraphQL(config.graphApp.port, 'mongo').then(() => log('GraphQL running'));

import {bootstrap as bootstrapGraphQL} from './graphQLApp.js';
import * as config from '../config/index.js';

bootstrapGraphQL(config.graphApp.port);

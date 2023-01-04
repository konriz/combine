import {bootstrap as bootstrapNode} from './nodeApp.js';
import {bootstrap as bootstrapGateway} from './gateway.js';
import * as config from './config/index.js';

bootstrapNode(config.common.port + 1);
bootstrapNode(config.common.port + 2);

bootstrapGateway(config.common.port);

import {bootstrap as bootstrapNode} from './nodeApp.js';
import {bootstrap as bootstrapGateway} from './gateway.js';
import * as config from './config/index.js';

bootstrapNode(config.nodeApp.port);

bootstrapGateway(config.gateway.port);

import { bootstrap as bootstrapNode } from './nodeApp/nodeApp.js';
import { bootstrap as bootstrapGateway } from './gateway.js';
import * as config from './config/index.js';
import { routingTable } from './routingTable.js';
import { runGraphApp } from './graphQLApp/runGraphApp.js';
import { log } from './logging.js';

bootstrapNode(config.nodeApp.port);

runGraphApp().then(() => log('GraphApp running'));

const routingTableInstance = routingTable(config.gateway.mapping);

bootstrapGateway(config.gateway.port, routingTableInstance);

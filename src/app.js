import { bootstrap as bootstrapNode } from './nodeApp/nodeApp.js';
import { bootstrap as bootstrapGateway } from './gateway.js';
import { bootstrap as bootstrapGraphQL } from './graphQLApp/graphQLApp.js';
import * as config from './config/index.js';
import { routingTable } from './routingTable.js';
import { log } from './logging.js';

bootstrapNode(config.nodeApp.port);
bootstrapGraphQL(config.graphApp.port, 'mongo').then(() => log('GraphQL running'));

const routingTableInstance = routingTable(config.gateway.mapping);

bootstrapGateway(config.gateway.port, routingTableInstance);

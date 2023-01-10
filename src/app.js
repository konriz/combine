import { bootstrap as bootstrapNode } from './nodeApp/nodeApp.js';
import { bootstrap as bootstrapGateway } from './gateway.js';
import { bootstrap as bootstrapGraphQL } from './graphQLApp/graphQLApp.js';
import * as config from './config/index.js';
import { routingTable } from './routingTable.js';

bootstrapNode(config.nodeApp.port);
bootstrapGraphQL(config.graphApp.port);

const routingTableInstance = routingTable(config.gateway.mapping);

bootstrapGateway(config.gateway.port, routingTableInstance);

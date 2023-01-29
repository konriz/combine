import * as dotenv from 'dotenv';

dotenv.config();

export const nodeApp = {
  port: process.env.NODE_PORT,
};

export const graphApp = {
  port: process.env.GRAPH_PORT,
  env: process.env.GRAPH_ENV,
};

export const gateway = {
  port: process.env.GATEWAY_PORT,
  mapping: {node: nodeApp.port, graphql: graphApp.port},
};

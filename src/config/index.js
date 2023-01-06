import * as dotenv from 'dotenv';

dotenv.config();

export const nodeApp = {
  port: process.env.NODE_PORT,
  title: process.env.NODE_TITLE
};

export const gateway = {
  port: process.env.GATEWAY_PORT,
  mapping: {'node': nodeApp.port}
};

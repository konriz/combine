import * as dotenv from 'dotenv';
dotenv.config();

export const common = {
  port: process.env.PORT || 8080,
  title: process.env.TITLE
};

import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const { 
  PORT,
  FRONTEND_URL,
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME,
} = process.env;

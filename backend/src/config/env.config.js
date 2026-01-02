import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME || 'chain_link_db',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  JWT_SECRET: process.env.JWT_SECRET || 'change_this_secret',
  SESSION_SECRET: process.env.SESSION_SECRET || 'change_this_session_secret'
};

export default env;

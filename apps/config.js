import dotenv from 'dotenv';

dotenv.config();

const config = {
  jwtPrivateKey:
    (typeof process !== 'undefined' && process.env.JWT_PRIVATE_KEY) ||
    'defaultPrivateKey',
  resourceServicePort:
    (typeof process !== 'undefined' && process.env.RESOURCE_SERVICE_PORT) ||
    4001,
  authServicePort:
    (typeof process !== 'undefined' && process.env.AUTH_SERVICE_PORT) || 4000,
  environment: process.env.NODE_ENV || 'development',
};

export default config;

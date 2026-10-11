import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

export interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  isProduction: boolean;
  isDevelopment: boolean;
  CLIENT_URL: string;
  MONGODB_URI: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  TWILIO_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE: string;
}

export const validateEnv = (): EnvConfig => {
  const errors: string[] = [];

  // 1. PORT validation
  const portStr = process.env.PORT?.trim();
  let parsedPort = 5000;
  if (!portStr) {
    errors.push('PORT is required.');
  } else {
    parsedPort = Number(portStr);
    if (isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
      errors.push(`PORT must be a valid port number between 1 and 65535, received: "${portStr}".`);
    }
  }

  // 2. MONGODB_URI validation
  const mongoUri = process.env.MONGODB_URI?.trim();
  if (!mongoUri) {
    errors.push('MONGODB_URI is required.');
  }

  // 3. REDIS_URL validation
  const redisUrl = process.env.REDIS_URL?.trim();
  if (!redisUrl) {
    errors.push('REDIS_URL is required.');
  }

  // 4. CLIENT_URL validation
  const clientUrl = process.env.CLIENT_URL?.trim();
  if (!clientUrl) {
    errors.push('CLIENT_URL is required.');
  }

  // 5. JWT_SECRET validation (required and at least 32 characters)
  const jwtSecret = process.env.JWT_SECRET?.trim();
  if (!jwtSecret) {
    errors.push('JWT_SECRET is required.');
  } else if (jwtSecret.length < 32) {
    errors.push(
      `JWT_SECRET must be at least 32 characters long for security (received ${jwtSecret.length} characters).`
    );
  }

  if (errors.length > 0) {
    const header = '❌ [Environment Validation Error] Server startup aborted due to configuration errors:';
    const formattedErrors = errors.map((err) => `  - ${err}`).join('\n');
    const fullMessage = `${header}\n${formattedErrors}\nPlease check your .env file or consult .env.example.`;

    console.error(`\n${fullMessage}\n`);
    throw new Error(fullMessage);
  }

  const nodeEnv = (process.env.NODE_ENV?.trim() as 'development' | 'production' | 'test') || 'development';
  const emailPortStr = process.env.EMAIL_PORT?.trim() || '587';
  const emailPort = Number(emailPortStr) || 587;

  return {
    PORT: parsedPort,
    NODE_ENV: nodeEnv,
    isProduction: nodeEnv === 'production',
    isDevelopment: nodeEnv !== 'production',
    CLIENT_URL: clientUrl!,
    MONGODB_URI: mongoUri!,
    REDIS_URL: redisUrl!,
    JWT_SECRET: jwtSecret!,
    EMAIL_HOST: process.env.EMAIL_HOST?.trim() || 'smtp.gmail.com',
    EMAIL_PORT: emailPort,
    EMAIL_USER: process.env.EMAIL_USER?.trim() || '',
    EMAIL_PASS: process.env.EMAIL_PASS?.trim() || '',
    TWILIO_SID: process.env.TWILIO_SID?.trim() || '',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN?.trim() || '',
    TWILIO_PHONE: process.env.TWILIO_PHONE?.trim() || '',
  };
};

export const env: EnvConfig = validateEnv();
export default env;

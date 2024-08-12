import { EnvVarNotFoundError } from '../errors/envvar.notfound.error';
import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(paramName: string): string {
  const value = process.env[paramName];

  if (!value) {
    throw new EnvVarNotFoundError(
      `Environment variable ${paramName} is empty`,
    );
  }

  if (value === '') {
    throw new EnvVarNotFoundError(`Environment variable ${paramName} is empty`);
  }

  return value;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

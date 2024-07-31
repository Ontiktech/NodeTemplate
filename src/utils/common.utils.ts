import { EnvVarNotFoundError } from '../errors/envvar.notfound.error';
import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(paramName: string): string {
  const value = process.env[paramName];
  if (value) {
    return value;
  } else {
    throw new EnvVarNotFoundError(
      `Environment variable ${paramName} not found`,
    );
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

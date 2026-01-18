/**
 * Environment variable handling and validation
 */

export interface EnvironmentConfig {
  nodeEnv: 'development' | 'production' | 'test';
  apiUrl: string;
  apiPort: number;
  debug: boolean;
}

/**
 * Get environment variable with type safety
 */
function getEnvString(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value ?? defaultValue ?? '';
}

/**
 * Get environment variable as number
 */
function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  const numValue = value ? parseInt(value, 10) : defaultValue;
  if (numValue === undefined || isNaN(numValue)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return numValue;
}

/**
 * Get environment variable as boolean
 */
function getEnvBoolean(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value === 'true' || value === '1' || value === 'yes';
}

/**
 * Load and validate environment configuration
 */
export function loadEnvironmentConfig(): EnvironmentConfig {
  return {
    nodeEnv: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    apiUrl: getEnvString('API_URL', 'http://localhost'),
    apiPort: getEnvNumber('API_PORT', 3000),
    debug: getEnvBoolean('DEBUG', false),
  };
}

export { getEnvString, getEnvNumber, getEnvBoolean };

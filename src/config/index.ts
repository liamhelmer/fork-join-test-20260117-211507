/**
 * Configuration module
 * Main export file for all configuration
 */

import { loadEnvironmentConfig, type EnvironmentConfig } from './environment';

/**
 * Main configuration interface
 */
export interface AppConfig {
  environment: EnvironmentConfig;
}

/**
 * Global configuration instance
 */
let config: AppConfig | null = null;

/**
 * Initialize and get the application configuration
 */
export function initializeConfig(): AppConfig {
  if (config) {
    return config;
  }

  config = {
    environment: loadEnvironmentConfig(),
  };

  return config;
}

/**
 * Get the current configuration
 * Must call initializeConfig() first
 */
export function getConfig(): AppConfig {
  if (!config) {
    throw new Error('Configuration not initialized. Call initializeConfig() first.');
  }
  return config;
}

// Export environment types and utilities
export type { EnvironmentConfig } from './environment';
export { loadEnvironmentConfig, getEnvString, getEnvNumber, getEnvBoolean } from './environment';

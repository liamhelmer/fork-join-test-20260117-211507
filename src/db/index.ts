/**
 * Database Module
 * Main entry point for all database-related functionality
 */

export {
  DatabaseConnection,
  ConnectionConfig,
  DatabaseConnection as default,
} from "./connection";
export type {
  DatabaseConnection as IDatabase,
  ConnectionConfig as IConnectionConfig,
} from "./connection";

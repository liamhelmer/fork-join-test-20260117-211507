/**
 * Authentication type definitions
 */

/**
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents an authentication token
 */
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * Request body for user login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response from login endpoint
 */
export interface LoginResponse {
  user: User;
  token: AuthToken;
}

/**
 * Request body for user registration
 */
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

/**
 * Response from registration endpoint
 */
export interface RegisterResponse {
  user: User;
  token: AuthToken;
}

/**
 * Request body for token refresh
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Response from token refresh endpoint
 */
export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

/**
 * Authentication error details
 */
export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Authentication context containing current user and token
 */
export interface AuthContext {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
}

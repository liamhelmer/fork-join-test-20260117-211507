/**
 * API Client
 * Provides basic HTTP methods for API communication
 */

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export interface ApiResponse<T = unknown> {
  status: number;
  data: T;
  headers: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;

  constructor(baseUrl: string, options?: { headers?: Record<string, string>; timeout?: number }) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = options?.headers || {};
    this.defaultTimeout = options?.timeout || 30000;
  }

  /**
   * Make a generic request to the API
   */
  async request<T = unknown>(
    endpoint: string,
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseUrl).toString();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...config.headers,
    };

    const fetchOptions: RequestInit = {
      method: config.method,
      headers,
      timeout: config.timeout || this.defaultTimeout,
    };

    if (config.body) {
      fetchOptions.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    return {
      status: response.status,
      data: data as T,
      headers: Object.fromEntries(response.headers.entries()),
    };
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config,
    });
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    endpoint: string,
    body: unknown,
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body,
      ...config,
    });
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    body: unknown,
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body,
      ...config,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T = unknown>(
    endpoint: string,
    body: unknown,
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body,
      ...config,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    });
  }

  /**
   * Update the base URL
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Update default headers
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = headers;
  }

  /**
   * Update default timeout
   */
  setDefaultTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }
}

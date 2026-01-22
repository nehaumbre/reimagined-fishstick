// TypeScript with Axios Examples
// Axios is a popular HTTP client library with excellent TypeScript support

// ============================================================================
// Installation
// ============================================================================

/*
npm install axios
npm install --save-dev @types/node
*/

// Note: Axios includes its own TypeScript definitions, so @types/axios is not needed

// ============================================================================
// Example 1: Basic Axios Usage with TypeScript
// ============================================================================

import axios, { AxiosResponse, AxiosError } from 'axios';

// Basic GET request
async function fetchUser() {
  try {
    const response: AxiosResponse = await axios.get('https://api.example.com/users/1');
    console.log('User data:', response.data);
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Status:', error.response?.status);
    } else {
      console.error('Unknown error:', error);
    }
  }
}

// ============================================================================
// Example 2: Typed Response Data
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchTypedUser(): Promise<User | null> {
  try {
    const response = await axios.get<User>('https://api.example.com/users/1');
    // response.data is now typed as User
    console.log('User name:', response.data.name);
    console.log('User email:', response.data.email);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// ============================================================================
// Example 3: Typed API Response Wrapper
// ============================================================================

async function fetchUserWithWrapper(): Promise<User | null> {
  try {
    const response = await axios.get<ApiResponse<User>>('https://api.example.com/users/1');
    // response.data is typed as ApiResponse<User>
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
    }
    return null;
  }
}

// ============================================================================
// Example 4: POST Request with Typed Data
// ============================================================================

interface CreateUserRequest {
  name: string;
  email: string;
  username: string;
}

interface CreateUserResponse {
  id: number;
  message: string;
}

async function createUser(userData: CreateUserRequest): Promise<CreateUserResponse | null> {
  try {
    const response = await axios.post<CreateUserResponse>(
      'https://api.example.com/users',
      userData
    );
    console.log('User created:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating user:', error.response?.data);
    }
    return null;
  }
}

// Usage:
// createUser({
//   name: "John Doe",
//   email: "john@example.com",
//   username: "johndoe"
// });

// ============================================================================
// Example 5: Axios Instance with Default Config
// ============================================================================

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = 'your-auth-token';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// Use the configured instance
async function fetchWithInstance(): Promise<User | null> {
  try {
    const response = await apiClient.get<User>('/users/1');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// ============================================================================
// Example 6: Custom Axios Instance Types
// ============================================================================

interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  apiKey?: string;
}

function createApiClient(config: ApiClientConfig) {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json',
      ...(config.apiKey && { 'X-API-Key': config.apiKey }),
    },
  });

  return client;
}

const customClient = createApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  apiKey: 'your-api-key',
});

// ============================================================================
// Example 7: Handling Different HTTP Methods
// ============================================================================

class UserService {
  private client = axios.create({
    baseURL: 'https://api.example.com/users',
  });

  async getAll(): Promise<User[]> {
    const response = await this.client.get<User[]>('/');
    return response.data;
  }

  async getById(id: number): Promise<User> {
    const response = await this.client.get<User>(`/${id}`);
    return response.data;
  }

  async create(user: CreateUserRequest): Promise<User> {
    const response = await this.client.post<User>('/', user);
    return response.data;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const response = await this.client.put<User>(`/${id}`, user);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/${id}`);
  }
}

// Usage:
// const userService = new UserService();
// const users = await userService.getAll();
// const user = await userService.getById(1);

// ============================================================================
// Example 8: Error Handling with Type Guards
// ============================================================================

interface ApiErrorResponse {
  error: {
    message: string;
    code: number;
  };
}

function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      const apiError = error.response.data as ApiErrorResponse;
      return `API Error: ${apiError.error.message} (Code: ${apiError.error.code})`;
    } else if (error.request) {
      // Request made but no response
      return 'Network Error: No response from server';
    } else {
      // Error in request setup
      return `Request Error: ${error.message}`;
    }
  }
  return 'Unknown error occurred';
}

async function safeFetchUser(id: number): Promise<User | string> {
  try {
    const response = await axios.get<User>(`https://api.example.com/users/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ============================================================================
// Example 9: Query Parameters with Types
// ============================================================================

interface UserQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'createdAt';
  order?: 'asc' | 'desc';
}

async function fetchUsersWithParams(params: UserQueryParams): Promise<User[]> {
  const response = await axios.get<User[]>('https://api.example.com/users', {
    params: params,
  });
  return response.data;
}

// Usage:
// fetchUsersWithParams({
//   page: 1,
//   limit: 10,
//   sortBy: 'name',
//   order: 'asc'
// });

// ============================================================================
// Example 10: File Upload with FormData
// ============================================================================

interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

async function uploadFile(file: File): Promise<UploadResponse | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<UploadResponse>(
      'https://api.example.com/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

// ============================================================================
// Example 11: Request Cancellation
// ============================================================================

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

async function cancellableRequest() {
  try {
    const response = await axios.get('https://api.example.com/data', {
      cancelToken: source.token,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

// Cancel the request
// source.cancel('Operation canceled by user');

// ============================================================================
// Example 12: Generic API Client Class
// ============================================================================

class ApiClient<T> {
  private client = axios.create({
    baseURL: 'https://api.example.com',
  });

  constructor(private endpoint: string) {}

  async getAll(): Promise<T[]> {
    const response = await this.client.get<T[]>(this.endpoint);
    return response.data;
  }

  async getById(id: number): Promise<T> {
    const response = await this.client.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const response = await this.client.post<T>(this.endpoint, data);
    return response.data;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const response = await this.client.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`${this.endpoint}/${id}`);
  }
}

// Usage:
// const userApi = new ApiClient<User>('/users');
// const users = await userApi.getAll();
// const user = await userApi.getById(1);

// ============================================================================
// Key Points About TypeScript with Axios
// ============================================================================

console.log("=== TypeScript with Axios ===");
console.log("\nKey Points:");
console.log("1. Axios includes built-in TypeScript definitions");
console.log("2. Use generic types for response data: axios.get<Type>()");
console.log("3. Use AxiosResponse<Type> for response typing");
console.log("4. Use axios.isAxiosError() for error type checking");
console.log("5. Create typed axios instances for API clients");
console.log("6. Use interceptors for authentication and error handling");
console.log("7. Leverage TypeScript's type inference for better DX");

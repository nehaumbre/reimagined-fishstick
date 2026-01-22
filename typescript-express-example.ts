// TypeScript with Express Examples
// Express.js with TypeScript provides type safety for web applications

// ============================================================================
// Installation
// ============================================================================

/*
npm install express
npm install --save-dev @types/express @types/node
npm install --save-dev typescript ts-node
*/

// ============================================================================
// Example 1: Basic Express App with TypeScript
// ============================================================================

import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello TypeScript with Express!' });
});

// Start server (commented out to allow file to compile)
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ============================================================================
// Example 2: Typed Request and Response
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
}

// GET endpoint
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  // In real app, fetch user from database
  const user: User = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
  };
  res.json(user);
});

// POST endpoint with typed body
app.post('/users', (req: Request, res: Response) => {
  const newUser: Omit<User, 'id'> = req.body;
  // In real app, create user in database
  const createdUser: User = {
    id: 1,
    ...newUser,
  };
  res.status(201).json(createdUser);
});

// ============================================================================
// Example 3: Custom Request Interface
// ============================================================================

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

// Middleware to add user to request
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // In real app, verify JWT token
  req.user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  };
  next();
};

app.get('/profile', authenticate, (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// ============================================================================
// Example 4: Typed Route Parameters
// ============================================================================

interface Params {
  id: string;
}

interface Query {
  page?: string;
  limit?: string;
}

app.get('/posts/:id', (req: Request<Params, {}, {}, Query>, res: Response) => {
  const postId = req.params.id;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  res.json({
    postId,
    page,
    limit,
  });
});

// ============================================================================
// Example 5: Typed Request Body
// ============================================================================

interface CreatePostRequest {
  title: string;
  content: string;
  authorId: number;
  tags?: string[];
}

interface Post extends CreatePostRequest {
  id: number;
  createdAt: Date;
}

app.post('/posts', (req: Request<{}, Post, CreatePostRequest>, res: Response<Post>) => {
  const postData = req.body;
  
  const newPost: Post = {
    id: Date.now(),
    ...postData,
    createdAt: new Date(),
  };

  res.status(201).json(newPost);
});

// ============================================================================
// Example 6: Custom Error Handling
// ============================================================================

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  } else {
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
};

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  throw new AppError('Something went wrong', 400);
});

app.use(errorHandler);

// ============================================================================
// Example 7: Async Route Handlers
// ============================================================================

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

app.get(
  '/async-data',
  asyncHandler(async (req: Request, res: Response) => {
    // Simulate async operation
    const data = await Promise.resolve({ message: 'Async data' });
    res.json(data);
  })
);

// ============================================================================
// Example 8: Route Handler Types
// ============================================================================

type RouteHandler = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

const handler1: RouteHandler = (req, res) => {
  res.json({ message: 'Handler 1' });
};

const handler2: RouteHandler = async (req, res) => {
  await Promise.resolve();
  res.json({ message: 'Handler 2' });
};

app.get('/handler1', handler1);
app.get('/handler2', handler2);

// ============================================================================
// Example 9: Router with TypeScript
// ============================================================================

import { Router } from 'express';

const router = Router();

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

router.get<{}, Product[]>('/products', (req, res) => {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 29, category: 'Accessories' },
  ];
  res.json(products);
});

router.get<{ id: string }, Product>('/products/:id', (req, res) => {
  const product: Product = {
    id: parseInt(req.params.id),
    name: 'Product',
    price: 99,
    category: 'General',
  };
  res.json(product);
});

router.post<{}, Product, Omit<Product, 'id'>>('/products', (req, res) => {
  const newProduct: Product = {
    id: Date.now(),
    ...req.body,
  };
  res.status(201).json(newProduct);
});

app.use('/api', router);

// ============================================================================
// Example 10: Middleware Types
// ============================================================================

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

const logger: Middleware = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

const timing: Middleware = async (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
  });
  next();
};

app.use(logger);
app.use(timing);

// ============================================================================
// Example 11: Type-Safe Controller Class
// ============================================================================

class UserController {
  async getAll(req: Request, res: Response<User[]>): Promise<void> {
    const users: User[] = [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' },
    ];
    res.json(users);
  }

  async getById(req: Request<{ id: string }>, res: Response<User>): Promise<void> {
    const userId = parseInt(req.params.id);
    const user: User = {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
    };
    res.json(user);
  }

  async create(req: Request<{}, User, Omit<User, 'id'>>, res: Response<User>): Promise<void> {
    const newUser: User = {
      id: Date.now(),
      ...req.body,
    };
    res.status(201).json(newUser);
  }
}

const userController = new UserController();

app.get('/controller/users', (req, res) => userController.getAll(req, res));
app.get('/controller/users/:id', (req, res) => userController.getById(req, res));
app.post('/controller/users', (req, res) => userController.create(req, res));

// ============================================================================
// Example 12: Environment Variables with Types
// ============================================================================

interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const getEnvConfig = (): EnvConfig => {
  return {
    PORT: parseInt(process.env.PORT || '3000'),
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
  };
};

// ============================================================================
// Key Points About TypeScript with Express
// ============================================================================

console.log("=== TypeScript with Express ===");
console.log("\nKey Points:");
console.log("1. Install @types/express for type definitions");
console.log("2. Use Request, Response, and NextFunction from express");
console.log("3. Extend Request interface for custom properties");
console.log("4. Type route parameters, query, and body explicitly");
console.log("5. Create typed error handlers for better error management");
console.log("6. Use async handlers with proper error handling");
console.log("7. Type controllers and services for better code organization");
console.log("8. Leverage TypeScript's type inference where possible");

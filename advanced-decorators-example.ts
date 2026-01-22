// TypeScript Decorators Examples
// Decorators provide a way to add metadata and modify classes, methods, properties

// ============================================================================
// Note: Decorators are an experimental feature
// Enable in tsconfig.json:
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }
// ============================================================================

// ============================================================================
// What are Decorators?
// ============================================================================
// Decorators are functions that can be attached to classes, methods, properties,
// and parameters. They use the @ syntax and are evaluated at runtime.

// ============================================================================
// Example 1: Class Decorator
// ============================================================================

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

// ============================================================================
// Example 2: Class Decorator Factory
// ============================================================================

function classDecoratorFactory(prefix: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      greeting = prefix + " " + constructor.prototype.greeting;
    };
  };
}

@classDecoratorFactory("Mr.")
class Person {
  greeting = "John";
}

// ============================================================================
// Example 3: Method Decorator
// ============================================================================

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);

// ============================================================================
// Example 4: Method Decorator Factory
// ============================================================================

function measureTime(unit: "ms" | "s" = "ms") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = unit === "ms" ? performance.now() : Date.now();
      const result = originalMethod.apply(this, args);
      const end = unit === "ms" ? performance.now() : Date.now();
      const duration = end - start;
      console.log(`${propertyKey} took ${duration}${unit}`);
      return result;
    };

    return descriptor;
  };
}

class DataProcessor {
  @measureTime("ms")
  processData(data: number[]): number[] {
    return data.map(x => x * 2);
  }
}

const processor = new DataProcessor();
processor.processData([1, 2, 3, 4, 5]);

// ============================================================================
// Example 5: Property Decorator
// ============================================================================

function format(target: any, propertyKey: string) {
  let value: string;

  const getter = function () {
    return value;
  };

  const setter = function (newVal: string) {
    value = newVal.toUpperCase();
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class User {
  @format
  name: string = "";
}

const user = new User();
user.name = "john doe";
console.log("Formatted name:", user.name); // "JOHN DOE"

// ============================================================================
// Example 6: Parameter Decorator
// ============================================================================

function required(target: any, propertyKey: string, parameterIndex: number) {
  const existingRequiredParameters: number[] =
    Reflect.getOwnMetadata("required", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  const requiredParams: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];

  descriptor.value = function (...args: any[]) {
    for (const index of requiredParams) {
      if (args[index] === undefined || args[index] === null) {
        throw new Error(`Parameter at index ${index} is required`);
      }
    }
    return method.apply(this, args);
  };
}

class UserService {
  @validate
  createUser(@required name: string, @required email: string, age?: number) {
    console.log(`Creating user: ${name}, ${email}, ${age || "N/A"}`);
  }
}

const userService = new UserService();
userService.createUser("John", "john@example.com", 30);
// userService.createUser("John"); // Error: Parameter at index 1 is required

// ============================================================================
// Example 7: Accessor Decorator
// ============================================================================

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number = 0;
  private _y: number = 0;

  @configurable(false)
  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}

// ============================================================================
// Example 8: Decorator Composition
// ============================================================================

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}

class Example {
  @first()
  @second()
  method() {
    console.log("method called");
  }
}

// Decorators are applied bottom-up (second, then first)
// Factories are evaluated top-down (first, then second)

// ============================================================================
// Example 9: Decorator with Metadata (requires reflect-metadata)
// ============================================================================

/*
// Install: npm install reflect-metadata

import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    const formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
*/

// ============================================================================
// Example 10: API Route Decorator (Express-like)
// ============================================================================

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const routes: Array<{ method: HttpMethod; path: string; handler: Function }> = [];

function route(method: HttpMethod, path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    routes.push({
      method,
      path,
      handler: descriptor.value!,
    });
  };
}

class UserController {
  @route("GET", "/users")
  getAllUsers() {
    return [{ id: 1, name: "John" }];
  }

  @route("POST", "/users")
  createUser() {
    return { id: 2, name: "Jane" };
  }

  @route("GET", "/users/:id")
  getUserById() {
    return { id: 1, name: "John" };
  }
}

console.log("Registered routes:", routes);

// ============================================================================
// Example 11: Authorization Decorator
// ============================================================================

function authorize(roles: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const userRole = "admin"; // In real app, get from context
      if (!roles.includes(userRole)) {
        throw new Error("Unauthorized");
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class AdminController {
  @authorize(["admin"])
  deleteUser(userId: number) {
    console.log(`Deleting user ${userId}`);
  }

  @authorize(["admin", "moderator"])
  editUser(userId: number) {
    console.log(`Editing user ${userId}`);
  }
}

// ============================================================================
// Example 12: Memoization Decorator
// ============================================================================

function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cache = new Map();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

class MathUtils {
  @memoize
  expensiveCalculation(n: number): number {
    console.log(`Calculating for ${n}...`);
    return n * n;
  }
}

const math = new MathUtils();
console.log(math.expensiveCalculation(5)); // Calculates
console.log(math.expensiveCalculation(5)); // Returns cached value

// ============================================================================
// Key Points About Decorators
// ============================================================================

console.log("\n=== Decorators ===");
console.log("Key Points:");
console.log("1. Enable experimentalDecorators in tsconfig.json");
console.log("2. Decorators are functions that modify classes/methods/properties");
console.log("3. Class decorators receive constructor function");
console.log("4. Method decorators receive target, propertyKey, descriptor");
console.log("5. Property decorators receive target and propertyKey");
console.log("6. Parameter decorators receive target, propertyKey, parameterIndex");
console.log("7. Decorators execute from bottom to top");
console.log("8. Decorator factories allow parameterized decorators");
console.log("9. Commonly used in frameworks (Angular, NestJS)");
console.log("10. Useful for cross-cutting concerns (logging, validation, etc.)");

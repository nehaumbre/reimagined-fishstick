// TypeScript Utility Types Examples
// Comprehensive guide to built-in utility types in TypeScript

// ============================================================================
// What are Utility Types?
// ============================================================================
// Utility types are built-in generic types that help transform existing types
// into new types, making type manipulation easier and more powerful.

// ============================================================================
// Example 1: Partial<T>
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// All properties become optional:
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = { id: 1, name: "John", email: "john@example.com", age: 30 };
const updated = updateUser(user, { name: "Jane", age: 25 });

console.log("Updated user:", updated);

// ============================================================================
// Example 2: Required<T>
// ============================================================================

interface Config {
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// All properties become required:
// {
//   apiKey: string;
//   timeout: number;
//   retries: number;
// }

function createClient(config: RequiredConfig) {
  console.log("Creating client with:", config);
}

// ============================================================================
// Example 3: Readonly<T>
// ============================================================================

type ReadonlyUser = Readonly<User>;
// All properties become readonly:
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
//   readonly age: number;
// }

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30
};

// readonlyUser.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property

// ============================================================================
// Example 4: Pick<T, K>
// ============================================================================

type UserNameAndEmail = Pick<User, "name" | "email">;
// Selects only specified properties:
// {
//   name: string;
//   email: string;
// }

function displayContact(user: UserNameAndEmail) {
  console.log(`${user.name} - ${user.email}`);
}

displayContact({ name: "John", email: "john@example.com" });

// ============================================================================
// Example 5: Omit<T, K>
// ============================================================================

type UserWithoutId = Omit<User, "id">;
// Removes specified properties:
// {
//   name: string;
//   email: string;
//   age: number;
// }

type UserWithoutSensitive = Omit<User, "email" | "age">;
// {
//   id: number;
//   name: string;
// }

function createUserProfile(user: UserWithoutId) {
  console.log("Creating profile for:", user.name);
}

// ============================================================================
// Example 6: Record<K, T>
// ============================================================================

type UserRoles = Record<string, boolean>;
// Creates an object type with string keys and boolean values:
// { [key: string]: boolean }

const roles: UserRoles = {
  admin: true,
  editor: false,
  viewer: true
};

type StatusMap = Record<"pending" | "approved" | "rejected", number>;
// {
//   pending: number;
//   approved: number;
//   rejected: number;
// }

const statusCounts: StatusMap = {
  pending: 5,
  approved: 10,
  rejected: 2
};

// ============================================================================
// Example 7: Exclude<T, U>
// ============================================================================

type AllColors = "red" | "green" | "blue" | "yellow";
type PrimaryColors = Exclude<AllColors, "yellow">;
// "red" | "green" | "blue"

type NonNullish = Exclude<string | number | null | undefined, null | undefined>;
// string | number

function handleColors(color: PrimaryColors) {
  console.log("Primary color:", color);
}

// ============================================================================
// Example 8: Extract<T, U>
// ============================================================================

type Colors = "red" | "green" | "blue" | "yellow";
type WarmColors = Extract<Colors, "red" | "yellow" | "orange">;
// "red" | "yellow" (only matches that exist in Colors)

type FunctionTypes = Extract<string | number | (() => void), Function>;
// () => void

// ============================================================================
// Example 9: NonNullable<T>
// ============================================================================

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

function processValue<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value cannot be null or undefined");
  }
  return value as NonNullable<T>;
}

// ============================================================================
// Example 10: Parameters<T>
// ============================================================================

function greet(name: string, age: number, city: string): string {
  return `Hello, ${name}! You are ${age} years old from ${city}.`;
}

type GreetParams = Parameters<typeof greet>;
// [string, number, string]

function callWithParams(fn: typeof greet, ...args: Parameters<typeof greet>) {
  return fn(...args);
}

const result = callWithParams(greet, "John", 30, "NYC");
console.log(result);

// ============================================================================
// Example 11: ConstructorParameters<T>
// ============================================================================

class UserService {
  constructor(public apiKey: string, public timeout: number) {}
}

type UserServiceParams = ConstructorParameters<typeof UserService>;
// [string, number]

function createService(...args: ConstructorParameters<typeof UserService>) {
  return new UserService(...args);
}

const service = createService("key123", 5000);

// ============================================================================
// Example 12: ReturnType<T>
// ============================================================================

type GreetReturn = ReturnType<typeof greet>;
// string

function wrapFunction<T extends (...args: any[]) => any>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    console.log("Calling function...");
    return fn(...args);
  };
}

const wrappedGreet = wrapFunction(greet);

// ============================================================================
// Example 13: InstanceType<T>
// ============================================================================

type UserServiceInstance = InstanceType<typeof UserService>;
// UserService

function createInstance<T extends new (...args: any[]) => any>(
  Constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new Constructor(...args);
}

const serviceInstance = createInstance(UserService, "key456", 3000);

// ============================================================================
// Example 14: Awaited<T> (TypeScript 4.5+)
// ============================================================================

type PromiseString = Promise<string>;
type UnwrappedString = Awaited<PromiseString>;
// string

type NestedPromise = Promise<Promise<number>>;
type DeepUnwrapped = Awaited<NestedPromise>;
// number

async function fetchData(): Promise<string> {
  return "data";
}

type FetchDataReturn = Awaited<ReturnType<typeof fetchData>>;
// string

// ============================================================================
// Example 15: Combining Utility Types
// ============================================================================

type UserUpdate = Partial<Pick<User, "name" | "email" | "age">>;
// Partial of selected properties

type CreateUserInput = Omit<User, "id">;
// All properties except id

type UserPreview = Pick<User, "id" | "name">;
// Only id and name

type SafeUser = Readonly<Omit<User, "email">>;
// Readonly user without email

// ============================================================================
// Example 16: Custom Utility Types
// ============================================================================

// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = PartialBy<User, "email">;
// All properties required except email

// Make specific properties required
type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

type ConfigWithRequiredApiKey = RequiredBy<Config, "apiKey">;
// apiKey is required, others optional

// Nullable type
type Nullable<T> = T | null;

type MaybeUser = Nullable<User>;

// ============================================================================
// Example 17: Deep Partial (Recursive)
// ============================================================================

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface NestedConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  db: {
    host: string;
    port: number;
  };
}

type PartialNestedConfig = DeepPartial<NestedConfig>;
// All nested properties are optional

// ============================================================================
// Example 18: Deep Readonly (Recursive)
// ============================================================================

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ReadonlyNestedConfig = DeepReadonly<NestedConfig>;
// All nested properties are readonly

// ============================================================================
// Example 19: ValueOf
// ============================================================================

type ValueOf<T> = T[keyof T];

type UserValue = ValueOf<User>;
// number | string (union of all property types)

// ============================================================================
// Example 20: KeysOfType
// ============================================================================

type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type StringKeys = KeysOfType<User, string>;
// "name" | "email"

type NumberKeys = KeysOfType<User, number>;
// "id" | "age"

// ============================================================================
// Key Points About Utility Types
// ============================================================================

console.log("=== Utility Types ===");
console.log("\nBuilt-in Utility Types:");
console.log("1. Partial<T> - Make all properties optional");
console.log("2. Required<T> - Make all properties required");
console.log("3. Readonly<T> - Make all properties readonly");
console.log("4. Pick<T, K> - Select specific properties");
console.log("5. Omit<T, K> - Exclude specific properties");
console.log("6. Record<K, T> - Create object type with keys K and values T");
console.log("7. Exclude<T, U> - Exclude types from union");
console.log("8. Extract<T, U> - Extract types from union");
console.log("9. NonNullable<T> - Remove null and undefined");
console.log("10. Parameters<T> - Extract function parameters");
console.log("11. ReturnType<T> - Extract function return type");
console.log("12. InstanceType<T> - Extract instance type from class");
console.log("13. Awaited<T> - Unwrap Promise types");
console.log("\nBest Practices:");
console.log("- Combine utility types for complex transformations");
console.log("- Create custom utility types for reusable patterns");
console.log("- Use utility types to create type-safe APIs");
console.log("- Leverage utility types for better code maintainability");

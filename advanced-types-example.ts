// TypeScript Advanced Types Examples
// Advanced type system features: Conditional Types, Mapped Types, Template Literal Types, Infer

// ============================================================================
// What are Advanced Types?
// ============================================================================
// Advanced types allow you to create complex type transformations and
// type-level programming to build powerful and flexible type systems.

// ============================================================================
// Example 1: Conditional Types (Basic)
// ============================================================================

type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>;        // true
type Test2 = IsArray<number>;          // false
type Test3 = IsArray<number[]>;        // true

// ============================================================================
// Example 2: Conditional Types with Union Distribution
// ============================================================================

type ToArray<T> = T extends any ? T[] : never;

type StrOrNum = ToArray<string | number>;  // string[] | number[]
// TypeScript distributes the conditional over unions

// ============================================================================
// Example 3: Exclude and Extract (Built-in Conditional Types)
// ============================================================================

type ExcludeExample = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type ExtractExample = Extract<"a" | "b" | "c", "a" | "b">;  // "a" | "b"

// Custom implementation:
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;

// ============================================================================
// Example 4: NonNullable (Conditional Type)
// ============================================================================

type NonNullableExample = NonNullable<string | number | null | undefined>;  // string | number

// Custom implementation:
type MyNonNullable<T> = T extends null | undefined ? never : T;

// ============================================================================
// Example 5: Infer Keyword (Type Inference in Conditionals)
// ============================================================================

type ReturnTypeExample<T> = T extends (...args: any[]) => infer R ? R : any;

function getString(): string {
  return "hello";
}

type GetStringReturn = ReturnTypeExample<typeof getString>;  // string

// Extract function parameters
type ParametersExample<T> = T extends (...args: infer P) => any ? P : never;

type GetStringParams = ParametersExample<typeof getString>;  // []

function add(a: number, b: number): number {
  return a + b;
}

type AddParams = ParametersExample<typeof add>;  // [number, number]

// Extract first parameter
type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type AddFirstParam = FirstParameter<typeof add>;  // number

// ============================================================================
// Example 6: Extract Promise Type
// ============================================================================

type Awaited<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Promise<string>;
type Unwrapped = Awaited<PromiseString>;  // string

type NestedPromise = Promise<Promise<number>>;
type DeepUnwrapped = Awaited<NestedPromise>;  // number

// ============================================================================
// Example 7: Mapped Types (Basic)
// ============================================================================

type ReadonlyExample<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = ReadonlyExample<Person>;
// { readonly name: string; readonly age: number; }

// ============================================================================
// Example 8: Mapped Types with Modifiers
// ============================================================================

type OptionalExample<T> = {
  [P in keyof T]?: T[P];
};

type RequiredExample<T> = {
  [P in keyof T]-?: T[P];
};

type PartialPerson = OptionalExample<Person>;
type RequiredPerson = RequiredExample<PartialPerson>;

// ============================================================================
// Example 9: Mapped Types with Key Remapping (TypeScript 4.1+)
// ============================================================================

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// {
//   getName: () => string;
//   getAge: () => number;
// }

// ============================================================================
// Example 10: Template Literal Types
// ============================================================================

type Greeting = `Hello, ${string}`;
type Email = `${string}@${string}.${string}`;

const greeting: Greeting = "Hello, World";
const email: Email = "user@example.com";

// ============================================================================
// Example 11: Template Literal Types with Unions
// ============================================================================

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = `/api/${string}`;

type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;

const route1: ApiRoute = "GET /api/users";
const route2: ApiRoute = "POST /api/users";
// const route3: ApiRoute = "PATCH /api/users";  // Error

// ============================================================================
// Example 12: String Manipulation Types
// ============================================================================

type UppercaseExample = Uppercase<"hello">;  // "HELLO"
type LowercaseExample = Lowercase<"WORLD">;  // "world"
type CapitalizeExample = Capitalize<"hello">;  // "Hello"
type UncapitalizeExample = Uncapitalize<"Hello">;  // "hello"

// ============================================================================
// Example 13: Complex Template Literal Type
// ============================================================================

type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">;  // "onClick"
type SubmitEvent = EventName<"submit">;  // "onSubmit"

type EventHandler<T extends string> = Record<EventName<T>, () => void>;

const handlers: EventHandler<"click" | "submit"> = {
  onClick: () => console.log("Clicked"),
  onSubmit: () => console.log("Submitted"),
};

// ============================================================================
// Example 14: Conditional Types with Mapped Types
// ============================================================================

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Mixed {
  name: string;
  age: number;
  greet(): void;
  calculate(x: number): number;
}

type MixedFunctions = FunctionPropertyNames<Mixed>;  // "greet" | "calculate"

// ============================================================================
// Example 15: Deep Readonly (Recursive Mapped Type)
// ============================================================================

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface Nested {
  level1: {
    level2: {
      value: string;
    };
  };
}

type ReadonlyNested = DeepReadonly<Nested>;

// ============================================================================
// Example 16: Type-Level Programming - Flatten
// ============================================================================

type Flatten<T> = T extends (infer U)[] ? U : T;

type NestedArray = string[][];
type Flattened = Flatten<NestedArray>;  // string[]

// ============================================================================
// Example 17: Distributive Conditional Types
// ============================================================================

type DistributiveExample<T> = T extends any ? T[] : never;

type Distributed = DistributiveExample<string | number>;  // string[] | number[]
// Not (string | number)[] - it distributes!

// ============================================================================
// Example 18: Tuple Manipulation
// ============================================================================

type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

type Tuple = [string, number, boolean];
type TupleHead = Head<Tuple>;  // string
type TupleTail = Tail<Tuple>;  // [number, boolean]
type TupleLast = Last<Tuple>;  // boolean

// ============================================================================
// Example 19: Function Overload Resolution with Conditional Types
// ============================================================================

type OverloadReturn<T> = T extends {
  (x: string): infer R1;
  (x: number): infer R2;
} ? R1 | R2 : never;

// ============================================================================
// Example 20: Branded Types Pattern
// ============================================================================

type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, "UserId">;
type ProductId = Brand<number, "ProductId">;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

// Prevents mixing IDs
const userId = createUserId(1);
const productId = createProductId(1);
// const invalid: UserId = productId;  // Error: types don't match

// ============================================================================
// Example 21: Type-level Math (Simple)
// ============================================================================

type Length<T extends any[]> = T["length"];

type TupleLength = Length<[1, 2, 3, 4]>;  // 4

// ============================================================================
// Example 22: Keyof and Indexed Access Types
// ============================================================================

interface ApiResponse {
  data: {
    users: User[];
    posts: Post[];
  };
  status: number;
}

type DataKeys = keyof ApiResponse["data"];  // "users" | "posts"
type Users = ApiResponse["data"]["users"];  // User[]

// ============================================================================
// Key Points About Advanced Types
// ============================================================================

console.log("=== Advanced Types ===");
console.log("\nKey Concepts:");
console.log("1. Conditional Types: T extends U ? X : Y");
console.log("2. Mapped Types: Transform object types");
console.log("3. Template Literal Types: String manipulation at type level");
console.log("4. Infer keyword: Extract types from other types");
console.log("5. Distributive Conditionals: Apply to each union member");
console.log("6. Type-level programming: Create complex type transformations");
console.log("7. Branded Types: Create distinct types from primitives");

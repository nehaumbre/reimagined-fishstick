// TypeScript Declaration Files Examples
// Declaration files (.d.ts) provide type information for JavaScript code

// ============================================================================
// What are Declaration Files?
// ============================================================================
// Declaration files contain type information and don't include implementations.
// They allow TypeScript to understand JavaScript libraries and code.

// ============================================================================
// Example 1: Basic Declaration File
// ============================================================================

// In a file: math-utils.d.ts
/*
declare module "math-utils" {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export const PI: number;
}
*/

// Usage:
// import { add, multiply, PI } from "math-utils";
// const result = add(5, 3);

// ============================================================================
// Example 2: Global Declaration
// ============================================================================

// In a file: global.d.ts
/*
declare global {
  interface Window {
    myCustomAPI: {
      greet(name: string): void;
      version: string;
    };
  }
  
  const MY_GLOBAL_CONSTANT: string;
}

export {};
*/

// Usage (after declaration):
// window.myCustomAPI.greet("TypeScript");
// console.log(MY_GLOBAL_CONSTANT);

// ============================================================================
// Example 3: Module Declaration for JavaScript Libraries
// ============================================================================

// For a JavaScript library without types: my-library.d.ts
/*
declare module "my-javascript-library" {
  export interface Config {
    apiKey: string;
    timeout?: number;
  }
  
  export class MyLibrary {
    constructor(config: Config);
    doSomething(): Promise<string>;
    getValue(key: string): any;
  }
  
  export function createInstance(config: Config): MyLibrary;
}
*/

// Usage:
// import { MyLibrary, createInstance } from "my-javascript-library";
// const lib = new MyLibrary({ apiKey: "123" });
// lib.doSomething();

// ============================================================================
// Example 4: Ambient Declarations
// ============================================================================

// Declaring types for code that exists at runtime
/*
declare var process: {
  env: {
    NODE_ENV: string;
    API_URL?: string;
  };
};

declare function setTimeout(
  callback: () => void,
  delay: number
): number;
*/

// Usage:
// console.log(process.env.NODE_ENV);
// setTimeout(() => console.log("Delayed"), 1000);

// ============================================================================
// Example 5: Type Declarations for Third-Party Modules
// ============================================================================

// When a library doesn't have @types package: custom-types.d.ts
/*
declare module "legacy-library" {
  export function oldFunction(param: string): number;
  export interface LegacyConfig {
    option1: boolean;
    option2: string;
  }
  export default function(config: LegacyConfig): void;
}
*/

// ============================================================================
// Example 6: Declaration Merging with Modules
// ============================================================================

// Extending existing module types
/*
declare module "express" {
  interface Request {
    user?: {
      id: number;
      name: string;
    };
  }
}
*/

// Usage:
// app.get("/api/user", (req, res) => {
//   if (req.user) {
//     console.log(req.user.name); // TypeScript knows user exists
//   }
// });

// ============================================================================
// Example 7: Namespace Declarations
// ============================================================================

/*
declare namespace MyNamespace {
  interface User {
    id: number;
    name: string;
  }
  
  function getUser(id: number): User;
  const API_VERSION: string;
}

// Usage:
// const user: MyNamespace.User = MyNamespace.getUser(1);
// console.log(MyNamespace.API_VERSION);
*/

// ============================================================================
// Example 8: Declaring Classes
// ============================================================================

/*
declare class ExternalClass {
  constructor(value: string);
  doSomething(): void;
  readonly property: number;
}

// Usage:
// const instance = new ExternalClass("test");
// instance.doSomething();
*/

// ============================================================================
// Example 9: Function Overloads in Declarations
// ============================================================================

/*
declare function processData(input: string): string;
declare function processData(input: number): number;
declare function processData(input: boolean): boolean;

// Usage:
// const result1 = processData("hello");  // string
// const result2 = processData(42);       // number
// const result3 = processData(true);     // boolean
*/

// ============================================================================
// Example 10: Generic Types in Declarations
// ============================================================================

/*
declare interface Repository<T> {
  findById(id: number): T | null;
  save(entity: T): T;
  delete(id: number): void;
}

declare function createRepository<T>(): Repository<T>;

// Usage:
// const userRepo = createRepository<User>();
// const user = userRepo.findById(1);
*/

// ============================================================================
// Example 11: Conditional and Utility Types in Declarations
// ============================================================================

/*
type NonNullable<T> = T extends null | undefined ? never : T;

declare function requireNonNull<T>(value: T): NonNullable<T>;
*/

// ============================================================================
// Example 12: Triple-Slash Directives
// ============================================================================

/*
/// <reference types="node" />
/// <reference lib="es2015" />
/// <reference path="./custom-types.d.ts" />

// These directives tell TypeScript to include type definitions
*/

// ============================================================================
// Declaration File Locations
// ============================================================================

console.log("=== Declaration Files Guide ===");
console.log("\nDeclaration File Locations:");
console.log("1. node_modules/@types/ - DefinitelyTyped packages");
console.log("2. *.d.ts files alongside source files");
console.log("3. types/ directory in your project");
console.log("4. Custom type declaration files");

// ============================================================================
// Creating Declaration Files for Your Code
// ============================================================================

/*
If you have TypeScript code and want to generate declarations:

tsconfig.json:
{
  "compilerOptions": {
    "declaration": true,        // Generate .d.ts files
    "declarationMap": true      // Generate source maps for declarations
  }
}

Running: tsc will generate both .js and .d.ts files
*/

// ============================================================================
// DefinitelyTyped (@types packages)
// ============================================================================

console.log("\nUsing @types packages:");
console.log("npm install --save-dev @types/node");
console.log("npm install --save-dev @types/express");
console.log("npm install --save-dev @types/lodash");

// ============================================================================
// Common Declaration File Patterns
// ============================================================================

// Pattern 1: Simple module declaration
/*
declare module "module-name" {
  export function fn(): void;
}
*/

// Pattern 2: Global augmentation
/*
declare global {
  interface Array<T> {
    myCustomMethod(): T[];
  }
}
export {};
*/

// Pattern 3: Module augmentation
/*
declare module "existing-module" {
  interface ExistingInterface {
    newProperty: string;
  }
}
*/

// ============================================================================
// Best Practices for Declaration Files
// ============================================================================

console.log("\nBest Practices:");
console.log("1. Use declare for ambient declarations");
console.log("2. Export types and interfaces when creating modules");
console.log("3. Use export {} to make file a module");
console.log("4. Document complex types with JSDoc comments");
console.log("5. Prefer interfaces over type aliases in declarations");
console.log("6. Use namespaces for organizing related declarations");
console.log("7. Include triple-slash directives when needed");

// ============================================================================
// JSDoc Comments in Declaration Files
// ============================================================================

/*
declare module "documented-module" {
  /**
   * Adds two numbers together
   * @param a - First number
   * @param b - Second number
   * @returns The sum of a and b
   */
  export function add(a: number, b: number): number;
}
*/

// ============================================================================
// Testing Declaration Files
// ============================================================================

console.log("\nTesting Declaration Files:");
console.log("1. Use tsc --noEmit to check for type errors");
console.log("2. Create test files that use your declarations");
console.log("3. Verify IntelliSense works correctly");
console.log("4. Check that all exported APIs are properly typed");

// ============================================================================
// Publishing Declaration Files
// ============================================================================

console.log("\nPublishing Declaration Files:");
console.log("1. Include .d.ts files in your npm package");
console.log("2. Set 'types' field in package.json");
console.log("3. Or submit to DefinitelyTyped for @types/ packages");
console.log("4. Ensure declarations match your implementation");

/*
package.json:
{
  "name": "my-package",
  "version": "1.0.0",
  "types": "dist/index.d.ts",
  "main": "dist/index.js"
}
*/

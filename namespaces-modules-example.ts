// TypeScript Namespaces and Modules Examples
// Understanding namespaces, modules, and module systems in TypeScript

// ============================================================================
// What are Namespaces and Modules?
// ============================================================================
// Namespaces are TypeScript's way of organizing code into logical groups.
// Modules are ES6/CommonJS modules for organizing and sharing code.

// ============================================================================
// Example 1: Basic Namespace
// ============================================================================

namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export class Rectangle {
    constructor(
      public width: number,
      public height: number
    ) {}

    area(): number {
      return this.width * this.height;
    }
  }

  export function distance(p1: Point, p2: Point): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Usage
const rect = new Geometry.Rectangle(10, 20);
console.log("Rectangle area:", rect.area());

const p1: Geometry.Point = { x: 0, y: 0 };
const p2: Geometry.Point = { x: 3, y: 4 };
console.log("Distance:", Geometry.distance(p1, p2));

// ============================================================================
// Example 2: Nested Namespaces
// ============================================================================

namespace Shapes {
  export namespace TwoD {
    export class Circle {
      constructor(public radius: number) {}
      area(): number {
        return Math.PI * this.radius ** 2;
      }
    }
  }

  export namespace ThreeD {
    export class Sphere {
      constructor(public radius: number) {}
      volume(): number {
        return (4 / 3) * Math.PI * this.radius ** 3;
      }
    }
  }
}

const circle = new Shapes.TwoD.Circle(5);
const sphere = new Shapes.ThreeD.Sphere(5);
console.log("Circle area:", circle.area());
console.log("Sphere volume:", sphere.volume());

// ============================================================================
// Example 3: Namespace Merging
// ============================================================================

namespace Utils {
  export function formatDate(date: Date): string {
    return date.toISOString();
  }
}

namespace Utils {
  export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

// Both functions are available
console.log("Date:", Utils.formatDate(new Date()));
console.log("Currency:", Utils.formatCurrency(123.45));

// ============================================================================
// Example 4: Namespace with Classes and Interfaces
// ============================================================================

namespace Database {
  export interface Connection {
    connect(): void;
    disconnect(): void;
  }

  export class MySQLConnection implements Connection {
    connect() {
      console.log("Connecting to MySQL...");
    }
    disconnect() {
      console.log("Disconnecting from MySQL...");
    }
  }

  export class PostgresConnection implements Connection {
    connect() {
      console.log("Connecting to Postgres...");
    }
    disconnect() {
      console.log("Disconnecting from Postgres...");
    }
  }
}

const mysql = new Database.MySQLConnection();
mysql.connect();

// ============================================================================
// Example 5: Using Namespaces with Aliases
// ============================================================================

import DB = Database;

const postgres = new DB.PostgresConnection();
postgres.connect();

// ============================================================================
// Example 6: ES6 Modules (Export)
// ============================================================================

// In a separate file: math.ts
/*
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

export default function multiply(a: number, b: number): number {
  return a * b;
}
*/

// Usage (in another file):
// import multiply, { add, subtract, PI } from './math';
// import * as MathUtils from './math';

// ============================================================================
// Example 7: ES6 Modules (Default and Named Exports)
// ============================================================================

// Example module structure:
/*
// user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserService {
  getUser(id: number): User {
    return { id, name: "John", email: "john@example.com" };
  }
}

export default UserService;
*/

// Usage:
// import UserService, { User } from './user';
// or
// import { User, UserService } from './user';

// ============================================================================
// Example 8: Re-exporting (Barrel Exports)
// ============================================================================

// In index.ts:
/*
export { User, UserService } from './user';
export { Product, ProductService } from './product';
export { Order, OrderService } from './order';
*/

// Usage:
// import { User, Product, Order } from './models';

// ============================================================================
// Example 9: Namespace vs Module
// ============================================================================

// Namespace (internal modules)
namespace InternalModule {
  export const value = 42;
}

// ES Module (external module)
/*
// external.ts
export const value = 42;
*/

// Key difference: Modules are file-based, namespaces are logical groupings

// ============================================================================
// Example 10: Ambient Namespaces
// ============================================================================

// For JavaScript libraries without types
/*
declare namespace jQuery {
  function ajax(settings: any): void;
  namespace fn {
    function extend(object: any): void;
  }
}

// Usage:
jQuery.ajax({});
jQuery.fn.extend({});
*/

// ============================================================================
// Example 11: Module Augmentation with Namespaces
// ============================================================================

// Extending existing modules
/*
declare module "express" {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
      };
    }
  }
}
*/

// ============================================================================
// Example 12: Dynamic Imports
// ============================================================================

async function loadModule() {
  // Dynamic import returns a Promise
  const module = await import('./some-module');
  module.doSomething();
}

// Conditional loading
if (condition) {
  import('./module-a').then(module => {
    module.init();
  });
} else {
  import('./module-b').then(module => {
    module.init();
  });
}

// ============================================================================
// Example 13: Type-only Imports/Exports
// ============================================================================

// TypeScript 3.8+ allows type-only imports
/*
import type { User } from './user';
import type { Product } from './product';

// Or mixed:
import { UserService, type User } from './user';
*/

// Type-only export
/*
export type { User, Product };
export type { User as UserType };
*/

// ============================================================================
// Example 14: Module Resolution Strategies
// ============================================================================

// tsconfig.json options:
/*
{
  "compilerOptions": {
    "moduleResolution": "node" | "classic" | "nodenext" | "bundler",
    "module": "commonjs" | "es2015" | "esnext" | "amd" | "system" | "umd",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "utils/*": ["src/utils/*"]
    }
  }
}
*/

// ============================================================================
// Example 15: CommonJS Interop
// ============================================================================

// Exporting CommonJS style
/*
module.exports = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b
};

// Or:
exports.add = (a: number, b: number) => a + b;
*/

// Importing CommonJS in ES modules
/*
import * as math from './math';
// or with esModuleInterop: true
import math from './math';
*/

// ============================================================================
// Key Points About Namespaces and Modules
// ============================================================================

console.log("\n=== Namespaces and Modules ===");
console.log("\nNamespaces:");
console.log("1. Organize code into logical groups");
console.log("2. Support namespace merging");
console.log("3. Can be nested");
console.log("4. Use 'export' to make items accessible");
console.log("5. Create aliases with 'import Alias = Namespace'");
console.log("\nModules:");
console.log("1. File-based code organization");
console.log("2. ES6 modules are standard (import/export)");
console.log("3. Support default and named exports");
console.log("4. Barrel exports for re-exporting");
console.log("5. Dynamic imports for code splitting");
console.log("6. Type-only imports for better tree-shaking");
console.log("\nBest Practices:");
console.log("- Prefer ES modules over namespaces");
console.log("- Use namespaces for organizing legacy code");
console.log("- Use barrel exports (index.ts) for clean imports");
console.log("- Use type-only imports when possible");
console.log("- Configure path aliases for cleaner imports");

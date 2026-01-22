// TypeScript Setup Guide
// This file explains how to set up TypeScript for optimal development

// ============================================================================
// Amazing Setup For TypeScript
// ============================================================================

/*
SETUP STEPS:

1. INSTALLATION
   - Global installation:
     npm install -g typescript
   
   - Local installation (recommended):
     npm install --save-dev typescript
     npm install --save-dev @types/node  (for Node.js types)

2. INITIALIZE TYPESCRIPT PROJECT
   - Create tsconfig.json:
     tsc --init
   
   - Or create tsconfig.json manually with recommended settings

3. RECOMMENDED TSCONFIG.JSON SETTINGS
*/

// ============================================================================
// Recommended tsconfig.json Configuration
// ============================================================================

/*
{
  "compilerOptions": {
    // Target and Module
    "target": "ES2020",                    // JavaScript version to compile to
    "module": "commonjs",                  // Module system (commonjs, esnext, etc.)
    "lib": ["ES2020"],                     // Library files to include
    
    // Output
    "outDir": "./dist",                    // Output directory for compiled files
    "rootDir": "./src",                    // Root directory of source files
    "removeComments": true,                // Remove comments from output
    
    // Type Checking
    "strict": true,                        // Enable all strict type-checking options
    "noImplicitAny": true,                 // Error on expressions with 'any' type
    "strictNullChecks": true,              // Enable strict null checks
    "strictFunctionTypes": true,           // Enable strict function types
    "strictBindCallApply": true,           // Enable strict bind/call/apply
    "strictPropertyInitialization": true,  // Enable strict property initialization
    "noImplicitThis": true,                // Error on implicit 'this'
    "alwaysStrict": true,                  // Parse in strict mode
    
    // Module Resolution
    "moduleResolution": "node",            // Module resolution strategy
    "baseUrl": ".",                        // Base directory for module resolution
    "paths": {                             // Path mapping
      "@/*": ["src/*"]
    },
    "resolveJsonModule": true,             // Allow importing JSON files
    "esModuleInterop": true,               // Enable interoperability with CommonJS
    "allowSyntheticDefaultImports": true,  // Allow default imports from modules
    
    // Emit
    "declaration": true,                   // Generate .d.ts files
    "declarationMap": true,                // Generate source maps for .d.ts files
    "sourceMap": true,                     // Generate .map files
    
    // Interop Constraints
    "isolatedModules": true,               // Ensure each file can be safely transpiled
    "skipLibCheck": true,                  // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true  // Ensure consistent file casing
  },
  "include": ["src/**/*"],                 // Files to include
  "exclude": ["node_modules", "dist"]      // Files to exclude
}
*/

// ============================================================================
// Package.json Scripts
// ============================================================================

/*
Add these scripts to your package.json:

{
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "dev": "ts-node src/index.ts",
    "dev:watch": "ts-node-dev --respawn src/index.ts",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  }
}
*/

// ============================================================================
// Development Tools
// ============================================================================

/*
ESSENTIAL PACKAGES:

1. TypeScript Compiler
   npm install --save-dev typescript

2. Type Definitions for Node.js
   npm install --save-dev @types/node

3. ts-node (Run TypeScript directly)
   npm install --save-dev ts-node

4. ts-node-dev (Run TypeScript with auto-reload)
   npm install --save-dev ts-node-dev

5. ESLint with TypeScript
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

6. Prettier (Code formatting)
   npm install --save-dev prettier

7. Jest with TypeScript
   npm install --save-dev jest @types/jest ts-jest
*/

// ============================================================================
// Example: Basic Project Structure
// ============================================================================

/*
Project Structure:

my-project/
├── src/
│   ├── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── types/
│       └── index.ts
├── dist/              (compiled JavaScript)
├── node_modules/
├── tsconfig.json
├── package.json
└── README.md
*/

// ============================================================================
// ESLint Configuration
// ============================================================================

/*
.eslintrc.json:

{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
*/

// ============================================================================
// Prettier Configuration
// ============================================================================

/*
.prettierrc:

{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
*/

// ============================================================================
// Jest Configuration for TypeScript
// ============================================================================

/*
jest.config.js:

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
*/

// ============================================================================
// Path Aliases (Using @ for src directory)
// ============================================================================

// With tsconfig.json paths configured as shown above:

/*
// Instead of:
import { helper } from '../../../utils/helpers';

// You can use:
import { helper } from '@/utils/helpers';
*/

// ============================================================================
// Type Definitions Location
// ============================================================================

/*
TYPES LOCATIONS:

1. @types packages (from DefinitelyTyped)
   - npm install --save-dev @types/node
   - npm install --save-dev @types/express

2. Built-in types (in node_modules/@types/)

3. Custom declaration files (*.d.ts)
   - src/types/global.d.ts
   - src/types/custom.d.ts

4. Type declarations in source files (*.ts)
*/

// ============================================================================
// Example: Custom Type Declaration File
// ============================================================================

/*
src/types/global.d.ts:

declare global {
  interface Window {
    myCustomProperty: string;
  }
}

export {};
*/

// ============================================================================
// Build Process Example
// ============================================================================

console.log("=== TypeScript Setup Guide ===");
console.log("\nKey Steps:");
console.log("1. Install TypeScript: npm install --save-dev typescript");
console.log("2. Initialize: tsc --init");
console.log("3. Configure tsconfig.json with strict settings");
console.log("4. Add build scripts to package.json");
console.log("5. Install development tools (ts-node, eslint, prettier)");
console.log("6. Set up path aliases for cleaner imports");
console.log("7. Configure linting and formatting");
console.log("\nBest Practices:");
console.log("- Always use strict mode");
console.log("- Enable source maps for debugging");
console.log("- Use path aliases for better organization");
console.log("- Set up ESLint and Prettier");
console.log("- Use ts-node for development");
console.log("- Compile to dist/ for production");

// ============================================================================
// VS Code Settings (Optional but Recommended)
// ============================================================================

/*
.vscode/settings.json:

{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
*/

// ============================================================================
// TypeScript Version Management
// ============================================================================

/*
RECOMMENDED APPROACH:

1. Use local TypeScript version (not global)
   - Ensures consistent version across team
   - Package in package.json

2. Use nvm (Node Version Manager) for Node.js versions

3. Pin TypeScript version:
   "devDependencies": {
     "typescript": "^5.0.0"  // or exact version "5.0.0"
   }
*/

// ============================================================================
// Performance Tips
// ============================================================================

console.log("\nPerformance Tips:");
console.log("- Use skipLibCheck: true (faster compilation)");
console.log("- Use incremental: true (faster subsequent builds)");
console.log("- Use composite: true (for project references)");
console.log("- Exclude node_modules and dist from compilation");
console.log("- Use isolatedModules for faster transpilation");

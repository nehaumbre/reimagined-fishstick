// TypeScript Generics Examples
// Generics allow you to create reusable components that work with multiple types

// ============================================================================
// What are Generics?
// ============================================================================
// Generics provide a way to make components work with any data type
// rather than a single one, while maintaining type safety.

// ============================================================================
// Example 1: Basic Generic Function
// ============================================================================

function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const numberValue = identity<number>(42);
const stringValue = identity<string>("Hello");
const booleanValue = identity<boolean>(true);

console.log("Number:", numberValue);
console.log("String:", stringValue);
console.log("Boolean:", booleanValue);

// TypeScript can infer the type
const inferredNumber = identity(100);  // TypeScript infers T as number
const inferredString = identity("World");  // TypeScript infers T as string

// ============================================================================
// Example 2: Generic Array Function
// ============================================================================

function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

const numbers = [1, 2, 3, 4, 5];
const strings = ["apple", "banana", "cherry"];
const mixed = [{ name: "John" }, { name: "Jane" }];

console.log("First number:", getFirstElement(numbers));
console.log("First string:", getFirstElement(strings));
console.log("First object:", getFirstElement(mixed));

// ============================================================================
// Example 3: Generic Interface
// ============================================================================

interface Box<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class NumberBox implements Box<number> {
  value: number;
  
  constructor(value: number) {
    this.value = value;
  }
  
  getValue(): number {
    return this.value;
  }
  
  setValue(value: number): void {
    this.value = value;
  }
}

class StringBox implements Box<string> {
  value: string;
  
  constructor(value: string) {
    this.value = value;
  }
  
  getValue(): string {
    return this.value;
  }
  
  setValue(value: string): void {
    this.value = value;
  }
}

const numberBox = new NumberBox(42);
const stringBox = new StringBox("Hello");

console.log("Number box value:", numberBox.getValue());
console.log("String box value:", stringBox.getValue());

// Generic class implementation
class GenericBox<T> implements Box<T> {
  value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  getValue(): T {
    return this.value;
  }
  
  setValue(value: T): void {
    this.value = value;
  }
}

const genericNumberBox = new GenericBox<number>(100);
const genericStringBox = new GenericBox<string>("World");

console.log("Generic number box:", genericNumberBox.getValue());
console.log("Generic string box:", genericStringBox.getValue());

// ============================================================================
// Example 4: Generic Constraints (extends)
// ============================================================================

interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength("Hello");           // string has length property
logLength([1, 2, 3, 4]);      // array has length property
// logLength(123);            // Error: number doesn't have length property

interface HasId {
  id: number;
}

function getById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" }
];

const user = getById(users, 2);
console.log("User with id 2:", user);

// ============================================================================
// Example 5: Using Type Parameters in Generic Constraints
// ============================================================================

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

const name = getProperty(person, "name");
const age = getProperty(person, "age");
// const invalid = getProperty(person, "invalid"); // Error: key doesn't exist

console.log("Name:", name);
console.log("Age:", age);

// ============================================================================
// Example 6: Generic Classes
// ============================================================================

class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log("Stack size:", numberStack.size());
console.log("Stack peek:", numberStack.peek());
console.log("Stack pop:", numberStack.pop());

const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log("String stack peek:", stringStack.peek());

// ============================================================================
// Example 7: Multiple Type Parameters
// ============================================================================

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const numberStringPair = pair<number, string>(1, "one");
const stringBooleanPair = pair<string, boolean>("test", true);

console.log("Number-String pair:", numberStringPair);
console.log("String-Boolean pair:", stringBooleanPair);

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = { key: "age", value: 30 };
const pair2: KeyValuePair<number, string> = { key: 1, value: "first" };

console.log("Key-Value pair 1:", pair1);
console.log("Key-Value pair 2:", pair2);

// ============================================================================
// Example 8: Generic Utility Types
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;

// Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - Select specific properties
type UserSummary = Pick<User, "id" | "name">;

// Record<K, T> - Create object type with keys K and values T
type UserMap = Record<string, User>;

const partialUser: PartialUser = {
  name: "John"
  // All other properties are optional
};

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: "Jane",
  email: "jane@example.com",
  age: 25
};

// readonlyUser.name = "New Name"; // Error: Cannot assign to 'name' because it is read-only

const userSummary: UserSummary = {
  id: 1,
  name: "Bob"
};

console.log("Partial User:", partialUser);
console.log("Readonly User:", readonlyUser);
console.log("User Summary:", userSummary);

// ============================================================================
// Example 9: Conditional Types (Advanced)
// ============================================================================

type NonNullable<T> = T extends null | undefined ? never : T;

type StringOrNumber = string | number | null | undefined;
type CleanStringOrNumber = NonNullable<StringOrNumber>; // string | number

function processValue<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value cannot be null or undefined");
  }
  return value as NonNullable<T>;
}

const result1 = processValue("hello");
const result2 = processValue(42);
// const result3 = processValue(null); // Throws error

console.log("Processed string:", result1);
console.log("Processed number:", result2);

// ============================================================================
// Example 10: Generic Functions with Default Types
// ============================================================================

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};

const defaultResponse: ApiResponse = {
  data: { anything: "here" },
  status: 200,
  message: "Success"
};

console.log("User Response:", userResponse);
console.log("Default Response:", defaultResponse);

// ============================================================================
// Example 11: Mapped Types
// ============================================================================

type ReadonlyFields<T> = {
  readonly [P in keyof T]: T[P];
};

type OptionalFields<T> = {
  [P in keyof T]?: T[P];
};

interface Person {
  name: string;
  age: number;
  email: string;
}

type ReadonlyPerson = ReadonlyFields<Person>;
type OptionalPerson = OptionalFields<Person>;

const readonlyPerson: ReadonlyPerson = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// readonlyPerson.name = "Jane"; // Error: Cannot assign to 'name' because it is read-only

const optionalPerson: OptionalPerson = {
  name: "Jane"
  // age and email are optional
};

console.log("Readonly Person:", readonlyPerson);
console.log("Optional Person:", optionalPerson);

// ============================================================================
// Key Points About Generics
// ============================================================================
console.log("\n=== Key Points About Generics ===");
console.log("1. Generics provide type safety while maintaining flexibility");
console.log("2. Use constraints (extends) to limit generic types");
console.log("3. TypeScript can infer generic types in many cases");
console.log("4. Generics work with functions, classes, and interfaces");
console.log("5. Multiple type parameters allow complex type relationships");
console.log("6. Utility types (Partial, Readonly, Pick, etc.) use generics");
console.log("7. Generics enable code reuse without sacrificing type safety");

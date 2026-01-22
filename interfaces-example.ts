// TypeScript Interfaces Examples
// Interfaces define contracts that objects must follow in TypeScript

// ============================================================================
// What are Interfaces?
// ============================================================================
// Interfaces describe the shape of objects, classes, and function signatures.
// They provide a way to define contracts that your code must adhere to.

// ============================================================================
// Example 1: Basic Interface
// ============================================================================

interface User {
  name: string;
  age: number;
  email: string;
}

function greetUser(user: User) {
  console.log(`Hello, ${user.name}! You are ${user.age} years old.`);
}

const user1: User = {
  name: "John Doe",
  age: 30,
  email: "john@example.com"
};

greetUser(user1);

// ============================================================================
// Example 2: Optional Properties
// ============================================================================

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;  // Optional property (using ?)
  inStock?: boolean;
}

function displayProduct(product: Product) {
  console.log(`Product: ${product.name} - $${product.price}`);
  if (product.description) {
    console.log(`Description: ${product.description}`);
  }
}

const product1: Product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  description: "High-performance laptop"
};

const product2: Product = {
  id: 2,
  name: "Mouse",
  price: 29.99
  // description is optional, so we can omit it
};

displayProduct(product1);
displayProduct(product2);

// ============================================================================
// Example 3: Readonly Properties
// ============================================================================

interface Config {
  readonly apiKey: string;  // Cannot be modified after initialization
  readonly apiUrl: string;
  timeout: number;
}

const config: Config = {
  apiKey: "abc123",
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// config.apiKey = "new-key"; // Error: Cannot assign to 'apiKey' because it is a read-only property
config.timeout = 10000; // OK: timeout is not readonly

// ============================================================================
// Example 4: Function Types in Interfaces
// ============================================================================

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
}

const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

console.log("Calculator add:", calculator.add(5, 3));
console.log("Calculator multiply:", calculator.multiply(4, 7));

// ============================================================================
// Example 5: Index Signatures
// ============================================================================

interface Dictionary {
  [key: string]: string;  // Any string key maps to a string value
}

const colors: Dictionary = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
};

console.log("Red color:", colors.red);
console.log("Green color:", colors["green"]);

// ============================================================================
// Example 6: Extending Interfaces
// ============================================================================

interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

interface Cat extends Animal {
  color: string;
  meow(): void;
}

const dog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark: () => console.log("Woof! Woof!")
};

const cat: Cat = {
  name: "Whiskers",
  age: 2,
  color: "Orange",
  meow: () => console.log("Meow!")
};

dog.bark();
cat.meow();

// ============================================================================
// Example 7: Multiple Interface Extension
// ============================================================================

interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  name: "Donald",
  age: 1,
  fly: () => console.log("Flying..."),
  swim: () => console.log("Swimming..."),
  quack: () => console.log("Quack!")
};

duck.fly();
duck.swim();
duck.quack();

// ============================================================================
// Example 8: Interface for Classes (implements)
// ============================================================================

interface Vehicle {
  start(): void;
  stop(): void;
  speed: number;
}

class Car implements Vehicle {
  speed: number = 0;
  
  start(): void {
    console.log("Car started");
    this.speed = 0;
  }
  
  stop(): void {
    console.log("Car stopped");
    this.speed = 0;
  }
  
  accelerate(): void {
    this.speed += 10;
    console.log(`Speed: ${this.speed} km/h`);
  }
}

const myCar = new Car();
myCar.start();
myCar.accelerate();
myCar.accelerate();
myCar.stop();

// ============================================================================
// Example 9: Interface Merging (Declaration Merging)
// ============================================================================

interface Window {
  title: string;
}

interface Window {
  version: string;
}

// Both properties are now available
const window: Window = {
  title: "My App",
  version: "1.0.0"
};

console.log(`Window: ${window.title} v${window.version}`);

// ============================================================================
// Example 10: Hybrid Types (Functions and Objects)
// ============================================================================

interface Counter {
  (start: number): string;  // Function signature
  interval: number;          // Property
  reset(): void;            // Method
}

function getCounter(): Counter {
  const counter = function (start: number) {
    return `Counter started at ${start}`;
  } as Counter;
  
  counter.interval = 123;
  counter.reset = function () {
    console.log("Counter reset");
  };
  
  return counter;
}

const c = getCounter();
console.log(c(10));
console.log("Interval:", c.interval);
c.reset();

// ============================================================================
// Example 11: Interface vs Type Alias
// ============================================================================

// Interface (can be extended, merged)
interface PointInterface {
  x: number;
  y: number;
}

// Type Alias (can use unions, intersections, primitives)
type PointType = {
  x: number;
  y: number;
};

// Interface can be extended
interface Point3D extends PointInterface {
  z: number;
}

// Type can use intersections
type Point3DType = PointType & {
  z: number;
};

const point3d: Point3D = { x: 1, y: 2, z: 3 };
const point3dType: Point3DType = { x: 4, y: 5, z: 6 };

console.log("3D Point (Interface):", point3d);
console.log("3D Point (Type):", point3dType);

// ============================================================================
// Example 12: Utility Types with Interfaces
// ============================================================================

interface UserProfile {
  id: number;
  name: string;
  email: string;
  age: number;
  admin: boolean;
}

// Partial: Makes all properties optional
type PartialUser = Partial<UserProfile>;

// Pick: Select specific properties
type UserNameAndEmail = Pick<UserProfile, "name" | "email">;

// Omit: Exclude specific properties
type UserWithoutAdmin = Omit<UserProfile, "admin">;

const partialUser: PartialUser = {
  name: "John"
  // All other properties are optional
};

const nameEmail: UserNameAndEmail = {
  name: "Jane",
  email: "jane@example.com"
};

const userWithoutAdmin: UserWithoutAdmin = {
  id: 1,
  name: "Bob",
  email: "bob@example.com",
  age: 25
  // admin is omitted
};

console.log("Partial User:", partialUser);
console.log("Name and Email:", nameEmail);
console.log("User without admin:", userWithoutAdmin);

// ============================================================================
// Key Points About Interfaces
// ============================================================================
console.log("\n=== Key Points About Interfaces ===");
console.log("1. Interfaces define contracts for object shapes");
console.log("2. Properties can be optional using ?");
console.log("3. Properties can be readonly");
console.log("4. Interfaces can extend other interfaces");
console.log("5. Classes can implement interfaces");
console.log("6. Interfaces support declaration merging");
console.log("7. Use interfaces for object shapes, type aliases for unions/intersections");

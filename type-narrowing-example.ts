// TypeScript Type Narrowing Examples
// Type narrowing is the process of refining types to more specific types

// ============================================================================
// What is Type Narrowing?
// ============================================================================
// Type narrowing allows TypeScript to understand that a variable has
// a more specific type within a certain code block, based on runtime checks.

// ============================================================================
// Example 1: typeof Guards
// ============================================================================

function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase()); // OK: string method
    // console.log(value.toFixed(2)); // Error: toFixed doesn't exist on string
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2)); // OK: number method
    // console.log(value.toUpperCase()); // Error: toUpperCase doesn't exist on number
  }
}

processValue("hello");
processValue(3.14159);

// ============================================================================
// Example 2: instanceof Guards
// ============================================================================

class Dog {
  name: string;
  breed: string;
  
  constructor(name: string, breed: string) {
    this.name = name;
    this.breed = breed;
  }
  
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  name: string;
  color: string;
  
  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
  
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    // TypeScript knows animal is Dog here
    animal.bark();
    console.log(`${animal.name} is a ${animal.breed}`);
  } else {
    // TypeScript knows animal is Cat here
    animal.meow();
    console.log(`${animal.name} is ${animal.color}`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

makeSound(dog);
makeSound(cat);

// ============================================================================
// Example 3: in Operator Guards
// ============================================================================

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    // TypeScript knows animal is Bird here
    animal.fly();
  } else {
    // TypeScript knows animal is Fish here
    animal.swim();
  }
  
  // Both types have layEggs
  animal.layEggs();
}

const bird: Bird = {
  fly: () => console.log("Flying..."),
  layEggs: () => console.log("Laying eggs")
};

const fish: Fish = {
  swim: () => console.log("Swimming..."),
  layEggs: () => console.log("Laying eggs")
};

move(bird);
move(fish);

// ============================================================================
// Example 4: Equality Narrowing
// ============================================================================

function printValue(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript knows both x and y are string here
    console.log(x.toUpperCase()); // OK
    console.log(y.toUpperCase()); // OK
  } else {
    console.log("x and y are different types or values");
  }
}

printValue("hello", "hello");
printValue("test", true);

// ============================================================================
// Example 5: Truthiness Narrowing
// ============================================================================

function printLength(str: string | null | undefined) {
  if (str) {
    // TypeScript knows str is string (not null or undefined) here
    console.log(`Length: ${str.length}`);
  } else {
    console.log("String is null or undefined");
  }
}

printLength("hello");
printLength(null);
printLength(undefined);

// ============================================================================
// Example 6: Discriminated Unions
// ============================================================================

interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // TypeScript knows shape is Circle here
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // TypeScript knows shape is Rectangle here
      return shape.width * shape.height;
    case "triangle":
      // TypeScript knows shape is Triangle here
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustiveness check
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const triangle: Triangle = { kind: "triangle", base: 3, height: 4 };

console.log("Circle area:", getArea(circle));
console.log("Rectangle area:", getArea(rectangle));
console.log("Triangle area:", getArea(triangle));

// ============================================================================
// Example 7: Type Predicates (Custom Type Guards)
// ============================================================================

interface Car {
  type: "car";
  brand: string;
  wheels: number;
}

interface Bicycle {
  type: "bicycle";
  brand: string;
  pedals: number;
}

type Vehicle = Car | Bicycle;

function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle.type === "car";
}

function displayVehicle(vehicle: Vehicle) {
  if (isCar(vehicle)) {
    // TypeScript knows vehicle is Car here
    console.log(`Car: ${vehicle.brand} with ${vehicle.wheels} wheels`);
  } else {
    // TypeScript knows vehicle is Bicycle here
    console.log(`Bicycle: ${vehicle.brand} with ${vehicle.pedals} pedals`);
  }
}

const car: Car = { type: "car", brand: "Toyota", wheels: 4 };
const bicycle: Bicycle = { type: "bicycle", brand: "Schwinn", pedals: 2 };

displayVehicle(car);
displayVehicle(bicycle);

// ============================================================================
// Example 8: Null and Undefined Narrowing
// ============================================================================

function processUser(user: string | null | undefined) {
  // Non-null assertion (use with caution)
  if (user != null) { // Checks for both null and undefined
    // TypeScript knows user is string here
    console.log(user.toUpperCase());
  }
  
  // Alternative: explicit null check
  if (user !== null && user !== undefined) {
    console.log(`Processing: ${user}`);
  }
  
  // Using optional chaining
  console.log(user?.toUpperCase());
}

processUser("John");
processUser(null);
processUser(undefined);

// ============================================================================
// Example 9: Array Type Narrowing
// ============================================================================

function processArray(arr: string[] | number[]) {
  if (arr.length === 0) {
    console.log("Empty array");
    return;
  }
  
  if (typeof arr[0] === "string") {
    // TypeScript knows arr is string[] here
    console.log("String array:", arr.map(s => s.toUpperCase()));
  } else {
    // TypeScript knows arr is number[] here
    console.log("Number array:", arr.map(n => n * 2));
  }
}

processArray(["apple", "banana", "cherry"]);
processArray([1, 2, 3, 4, 5]);

// ============================================================================
// Example 10: Assertion Functions
// ============================================================================

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Value is not a number");
  }
}

function multiplyByTwo(value: unknown) {
  assertIsNumber(value);
  // TypeScript knows value is number here
  return value * 2;
}

console.log("Multiply:", multiplyByTwo(5));
// console.log(multiplyByTwo("5")); // Throws error at runtime

// ============================================================================
// Example 11: Control Flow Analysis
// ============================================================================

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  } else if (typeof x === "string") {
    // x is string, y is boolean
    console.log("x is string, y is boolean");
  } else {
    // x is number, y could be string or boolean
    console.log("x is number");
  }
}

example("test", "test");
example("hello", true);
example(42, false);

// ============================================================================
// Example 12: Narrowing with Array Methods
// ============================================================================

function filterNumbers(values: (string | number)[]): number[] {
  return values.filter((value): value is number => typeof value === "number");
}

const mixed = [1, "hello", 2, "world", 3, "typescript"];
const numbers = filterNumbers(mixed);

console.log("Filtered numbers:", numbers);
// TypeScript knows numbers is number[]

// ============================================================================
// Key Points About Type Narrowing
// ============================================================================
console.log("\n=== Key Points About Type Narrowing ===");
console.log("1. typeof guards narrow types based on primitive types");
console.log("2. instanceof guards narrow types based on class instances");
console.log("3. in operator checks for property existence");
console.log("4. Discriminated unions use common properties to narrow");
console.log("5. Type predicates (is) create custom type guards");
console.log("6. TypeScript tracks control flow to narrow types");
console.log("7. Type narrowing improves type safety and IntelliSense");

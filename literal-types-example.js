// Literal Types Examples
// Note: Literal types are primarily a TypeScript feature, but this file demonstrates
// the concept with JavaScript examples and TypeScript syntax examples.

// ============================================================================
// What are Literal Types?
// ============================================================================
// A literal type is a type that represents a single exact value.
// In TypeScript, you can use string literals, number literals, or boolean literals.

// ============================================================================
// Example 1: String Literal Types
// ============================================================================

// In TypeScript, you would define:
// type Direction = "north" | "south" | "east" | "west";
// type Status = "pending" | "approved" | "rejected";

// JavaScript equivalent using constants:
const Direction = {
  NORTH: "north",
  SOUTH: "south",
  EAST: "east",
  WEST: "west"
};

const Status = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected"
};

// Example function using string literals
function move(direction) {
  // In TypeScript: function move(direction: "north" | "south" | "east" | "west")
  const validDirections = ["north", "south", "east", "west"];
  if (!validDirections.includes(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }
  console.log(`Moving ${direction}`);
}

// Usage examples
move("north"); // Valid
move("south"); // Valid
// move("up"); // Would throw error in TypeScript (type error) or runtime (in JS)

// ============================================================================
// Example 2: Number Literal Types
// ============================================================================

// In TypeScript:
// type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
// type HttpStatusCode = 200 | 201 | 400 | 404 | 500;

function rollDice(roll) {
  // In TypeScript: function rollDice(roll: 1 | 2 | 3 | 4 | 5 | 6)
  const validRolls = [1, 2, 3, 4, 5, 6];
  if (!validRolls.includes(roll)) {
    throw new Error(`Invalid dice roll: ${roll}. Must be between 1 and 6.`);
  }
  return `You rolled: ${roll}`;
}

console.log(rollDice(3)); // Valid
console.log(rollDice(6)); // Valid
// rollDice(7); // Would error in TypeScript

// ============================================================================
// Example 3: Boolean Literal Types (less common)
// ============================================================================

// In TypeScript:
// type TrueOnly = true;
// type FalseOnly = false;

function setFeatureFlag(enabled) {
  // TypeScript: function setFeatureFlag(enabled: true | false)
  // Or just: function setFeatureFlag(enabled: boolean)
  console.log(`Feature flag set to: ${enabled}`);
}

setFeatureFlag(true);
setFeatureFlag(false);

// ============================================================================
// Example 4: Combining Literal Types
// ============================================================================

// In TypeScript:
// type Theme = "light" | "dark";
// type Size = "small" | "medium" | "large";
// type ButtonVariant = Theme | Size; // Combined types

const Theme = {
  LIGHT: "light",
  DARK: "dark"
};

const Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

function createButton(variant, size) {
  // TypeScript: function createButton(variant: Theme, size: Size)
  console.log(`Creating ${variant} button with ${size} size`);
}

createButton("light", "medium");
createButton("dark", "large");

// ============================================================================
// Example 5: Literal Types with Objects
// ============================================================================

// In TypeScript:
// type Config = {
//   mode: "development" | "production";
//   port: 3000 | 8080;
//   debug: true;
// };

function createConfig(config) {
  // TypeScript would enforce these literal types
  const validModes = ["development", "production"];
  const validPorts = [3000, 8080];
  
  if (!validModes.includes(config.mode)) {
    throw new Error("Mode must be 'development' or 'production'");
  }
  
  if (!validPorts.includes(config.port)) {
    throw new Error("Port must be 3000 or 8080");
  }
  
  return config;
}

const config1 = createConfig({
  mode: "development",
  port: 3000,
  debug: true
});

console.log(config1);

// ============================================================================
// Example 6: Template Literal Types (TypeScript 4.1+)
// ============================================================================

// In TypeScript:
// type EventName<T extends string> = `on${Capitalize<T>}`;
// type ClickEvent = EventName<"click">; // "onClick"
// type SubmitEvent = EventName<"submit">; // "onSubmit"

// JavaScript equivalent using template strings:
function createEventName(event) {
  const capitalized = event.charAt(0).toUpperCase() + event.slice(1);
  return `on${capitalized}`;
}

console.log(createEventName("click")); // "onClick"
console.log(createEventName("submit")); // "onSubmit"

// ============================================================================
// Benefits of Literal Types
// ============================================================================
// 1. Type Safety: Catch errors at compile time (TypeScript)
// 2. Autocomplete: Better IDE support
// 3. Refactoring: Easier to change values across codebase
// 4. Documentation: Code is self-documenting
// 5. Prevents typos and invalid values

// ============================================================================
// Practical Use Cases
// ============================================================================

// API Response Status
function handleResponse(status) {
  switch (status) {
    case "success":
      return "Operation completed";
    case "error":
      return "Operation failed";
    case "loading":
      return "Operation in progress";
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}

// CSS-in-JS styling
function getButtonStyles(variant) {
  const styles = {
    primary: { backgroundColor: "blue", color: "white" },
    secondary: { backgroundColor: "gray", color: "black" },
    danger: { backgroundColor: "red", color: "white" }
  };
  return styles[variant] || styles.primary;
}

console.log(getButtonStyles("primary"));
console.log(getButtonStyles("secondary"));

// Export for use in other files (if using modules)
// export { Direction, Status, move, rollDice, createButton, createConfig };

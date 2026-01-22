// TypeScript Enums Examples
// This file demonstrates various types of enums in TypeScript

// ============================================================================
// What are Enums?
// ============================================================================
// Enums allow you to define a set of named constants. They help make code
// more readable and maintainable by giving meaningful names to numeric or string values.

// ============================================================================
// Example 1: Numeric Enums (Default)
// ============================================================================

enum Direction {
  North,    // 0 (auto-incremented from 0)
  South,    // 1
  East,     // 2
  West      // 3
}

console.log("=== Numeric Enums ===");
console.log("Direction.North:", Direction.North);        // 0
console.log("Direction.South:", Direction.South);        // 1
console.log("Direction[0]:", Direction[0]);              // "North" (reverse mapping)
console.log("Direction[2]:", Direction[2]);              // "East"

function move(direction: Direction) {
  console.log(`Moving ${Direction[direction]}`);
}

move(Direction.North);
move(Direction.East);

// ============================================================================
// Example 2: Numeric Enums with Custom Starting Value
// ============================================================================

enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500
}

console.log("\n=== Numeric Enums with Custom Values ===");
console.log("StatusCode.OK:", StatusCode.OK);
console.log("StatusCode.NotFound:", StatusCode.NotFound);

function handleResponse(code: StatusCode) {
  switch (code) {
    case StatusCode.OK:
      return "Request successful";
    case StatusCode.Created:
      return "Resource created";
    case StatusCode.BadRequest:
      return "Invalid request";
    case StatusCode.NotFound:
      return "Resource not found";
    case StatusCode.InternalServerError:
      return "Server error";
    default:
      return "Unknown status";
  }
}

console.log(handleResponse(StatusCode.OK));
console.log(handleResponse(StatusCode.NotFound));

// ============================================================================
// Example 3: String Enums
// ============================================================================

enum Theme {
  Light = "light",
  Dark = "dark",
  Auto = "auto"
}

console.log("\n=== String Enums ===");
console.log("Theme.Light:", Theme.Light);        // "light"
console.log("Theme.Dark:", Theme.Dark);          // "dark"

function setTheme(theme: Theme) {
  console.log(`Setting theme to: ${theme}`);
}

setTheme(Theme.Dark);
setTheme(Theme.Light);

// Note: String enums don't have reverse mapping like numeric enums
// Theme["light"] would not work (unlike numeric enums)

// ============================================================================
// Example 4: Heterogeneous Enums (Mixed String and Number)
// ============================================================================

enum MixedEnum {
  No = 0,
  Yes = "YES",
  Maybe = 1
}

console.log("\n=== Heterogeneous Enums ===");
console.log("MixedEnum.No:", MixedEnum.No);
console.log("MixedEnum.Yes:", MixedEnum.Yes);
console.log("MixedEnum.Maybe:", MixedEnum.Maybe);

// ============================================================================
// Example 5: Computed Enums (with expressions)
// ============================================================================

enum FileAccess {
  None,           // 0
  Read = 1 << 1,  // 2 (bit shift)
  Write = 1 << 2, // 4
  ReadWrite = Read | Write  // 6 (bitwise OR)
}

console.log("\n=== Computed Enums ===");
console.log("FileAccess.Read:", FileAccess.Read);
console.log("FileAccess.Write:", FileAccess.Write);
console.log("FileAccess.ReadWrite:", FileAccess.ReadWrite);

function checkAccess(access: FileAccess) {
  if ((access & FileAccess.Read) === FileAccess.Read) {
    console.log("Read permission granted");
  }
  if ((access & FileAccess.Write) === FileAccess.Write) {
    console.log("Write permission granted");
  }
}

checkAccess(FileAccess.ReadWrite);

// ============================================================================
// Example 6: Const Enums (compiled inline, no JavaScript object generated)
// ============================================================================

const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L",
  ExtraLarge = "XL"
}

console.log("\n=== Const Enums ===");
// Const enums are inlined at compile time
console.log("Size.Medium:", Size.Medium);  // Directly replaced with "M" in compiled code
console.log("Size.Large:", Size.Large);    // Directly replaced with "L" in compiled code

// ============================================================================
// Example 7: Enums in Objects and Functions
// ============================================================================

enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest"
}

interface User {
  name: string;
  role: UserRole;
}

function canAccessAdminPanel(user: User): boolean {
  return user.role === UserRole.Admin;
}

console.log("\n=== Enums in Objects ===");
const admin: User = { name: "John", role: UserRole.Admin };
const guest: User = { name: "Jane", role: UserRole.Guest };

console.log(`${admin.name} can access admin:`, canAccessAdminPanel(admin));
console.log(`${guest.name} can access admin:`, canAccessAdminPanel(guest));

// ============================================================================
// Example 8: Enum as Union Type Alternative
// ============================================================================

// Instead of:
// type Status = "pending" | "approved" | "rejected";

enum ApprovalStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected"
}

function processStatus(status: ApprovalStatus) {
  console.log(`Processing status: ${status}`);
}

console.log("\n=== Enum as Type ===");
processStatus(ApprovalStatus.Pending);
processStatus(ApprovalStatus.Approved);

// ============================================================================
// Key Differences and Best Practices
// ============================================================================
console.log("\n=== Key Points ===");
console.log("1. Numeric enums support reverse mapping (enum[value] works)");
console.log("2. String enums do NOT support reverse mapping");
console.log("3. Const enums are inlined and don't generate JavaScript objects");
console.log("4. Use string enums for better debugging (values appear in logs)");
console.log("5. Use numeric enums when you need reverse mapping or bitwise operations");

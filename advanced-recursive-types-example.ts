// TypeScript Recursive Types and Advanced Patterns
// Recursive types allow types to reference themselves

// ============================================================================
// What are Recursive Types?
// ============================================================================
// Recursive types are types that reference themselves in their definition.
// They're useful for representing tree structures, linked lists, and nested data.

// ============================================================================
// Example 1: Basic Recursive Type - Tree Node
// ============================================================================

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const tree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 }
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 }
  }
};

function traverseTree(node: TreeNode | undefined): number[] {
  if (!node) return [];
  return [
    ...traverseTree(node.left),
    node.value,
    ...traverseTree(node.right)
  ];
}

console.log("Tree traversal:", traverseTree(tree));

// ============================================================================
// Example 2: Linked List
// ============================================================================

interface ListNode<T> {
  value: T;
  next?: ListNode<T>;
}

const list: ListNode<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4
      }
    }
  }
};

function printList<T>(node: ListNode<T> | undefined): void {
  if (!node) return;
  console.log(node.value);
  printList(node.next);
}

printList(list);

// ============================================================================
// Example 3: Nested Object Structure
// ============================================================================

interface NestedObject {
  [key: string]: NestedObject | string | number | boolean;
}

const nested: NestedObject = {
  level1: {
    level2: {
      level3: {
        value: "deep"
      },
      number: 42
    },
    string: "hello"
  },
  top: "level"
};

function getNestedValue(obj: NestedObject, path: string[]): any {
  return path.reduce((current, key) => {
    const next = current[key];
    return typeof next === "object" ? next : next;
  }, obj);
}

console.log("Nested value:", getNestedValue(nested, ["level1", "level2", "value"]));

// ============================================================================
// Example 4: Recursive Type Alias
// ============================================================================

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const jsonData: JSONValue = {
  name: "John",
  age: 30,
  hobbies: ["coding", "reading"],
  address: {
    street: "123 Main St",
    city: "NYC",
    coordinates: [40.7128, -74.0060]
  }
};

// ============================================================================
// Example 5: Recursive Generic Type
// ============================================================================

type NestedArray<T> = T | NestedArray<T>[];

const nestedArray: NestedArray<number> = [
  1,
  [2, 3],
  [4, [5, 6]],
  7
];

function flatten<T>(arr: NestedArray<T>): T[] {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  return arr.flatMap(flatten);
}

console.log("Flattened:", flatten(nestedArray));

// ============================================================================
// Example 6: File System Structure
// ============================================================================

type FileSystemNode =
  | { type: "file"; name: string; size: number }
  | { type: "directory"; name: string; children: FileSystemNode[] };

const fileSystem: FileSystemNode = {
  type: "directory",
  name: "root",
  children: [
    { type: "file", name: "file1.txt", size: 100 },
    {
      type: "directory",
      name: "docs",
      children: [
        { type: "file", name: "readme.md", size: 200 },
        { type: "file", name: "changelog.md", size: 150 }
      ]
    },
    { type: "file", name: "config.json", size: 50 }
  ]
};

function calculateTotalSize(node: FileSystemNode): number {
  if (node.type === "file") {
    return node.size;
  }
  return node.children.reduce((sum, child) => sum + calculateTotalSize(child), 0);
}

console.log("Total size:", calculateTotalSize(fileSystem));

// ============================================================================
// Example 7: Recursive Type with Constraints
// ============================================================================

interface RecursiveContainer<T> {
  value: T;
  children?: RecursiveContainer<T>[];
}

type StringContainer = RecursiveContainer<string>;

const container: StringContainer = {
  value: "root",
  children: [
    { value: "child1", children: [{ value: "grandchild1" }] },
    { value: "child2" }
  ]
};

// ============================================================================
// Example 8: Mutual Recursion
// ============================================================================

interface Expression {
  type: "literal" | "binary" | "unary";
  value?: number;
  operator?: BinaryOperator | UnaryOperator;
  left?: Expression;
  right?: Expression;
  operand?: Expression;
}

type BinaryOperator = "+" | "-" | "*" | "/";
type UnaryOperator = "-" | "!";

const expression: Expression = {
  type: "binary",
  operator: "+",
  left: {
    type: "literal",
    value: 5
  },
  right: {
    type: "binary",
    operator: "*",
    left: {
      type: "literal",
      value: 3
    },
    right: {
      type: "literal",
      value: 2
    }
  }
};

function evaluate(expr: Expression): number {
  switch (expr.type) {
    case "literal":
      return expr.value!;
    case "binary":
      const left = evaluate(expr.left!);
      const right = evaluate(expr.right!);
      switch (expr.operator) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
      }
    case "unary":
      const operand = evaluate(expr.operand!);
      switch (expr.operator) {
        case "-": return -operand;
        case "!": return operand === 0 ? 1 : 0;
      }
  }
  return 0;
}

console.log("Expression result:", evaluate(expression));

// ============================================================================
// Example 9: Recursive Utility Types
// ============================================================================

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

interface NestedData {
  level1: {
    level2: {
      value: string;
    };
  };
}

type ReadonlyNested = DeepReadonly<NestedData>;
type PartialNested = DeepPartial<NestedData>;

// ============================================================================
// Example 10: Recursive Type with Depth Limit
// ============================================================================

type DeepPick<T, K extends string, D extends number = 3> =
  D extends 0 ? T :
  K extends keyof T ? T[K] :
  K extends `${infer Key}.${infer Rest}` ?
    Key extends keyof T ?
      T[Key] extends object ?
        DeepPick<T[Key], Rest, Prev<D>> :
        never :
      never :
    never;

type Prev<N extends number> = N extends 1 ? 0 : N extends 2 ? 1 : N extends 3 ? 2 : never;

// ============================================================================
// Example 11: Comment Thread Structure
// ============================================================================

interface Comment {
  id: number;
  author: string;
  content: string;
  replies: Comment[];
}

const commentThread: Comment = {
  id: 1,
  author: "Alice",
  content: "Great post!",
  replies: [
    {
      id: 2,
      author: "Bob",
      content: "Thanks!",
      replies: [
        {
          id: 3,
          author: "Alice",
          content: "You're welcome!",
          replies: []
        }
      ]
    },
    {
      id: 4,
      author: "Charlie",
      content: "I agree!",
      replies: []
    }
  ]
};

function countComments(comment: Comment): number {
  return 1 + comment.replies.reduce((sum, reply) => sum + countComments(reply), 0);
}

console.log("Total comments:", countComments(commentThread));

// ============================================================================
// Example 12: Menu/Navigation Structure
// ============================================================================

interface MenuItem {
  label: string;
  path?: string;
  children?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Products",
    children: [
      {
        label: "Electronics",
        children: [
          { label: "Phones", path: "/products/electronics/phones" },
          { label: "Laptops", path: "/products/electronics/laptops" }
        ]
      },
      {
        label: "Clothing",
        path: "/products/clothing"
      }
    ]
  },
  {
    label: "About",
    path: "/about"
  }
];

function getAllPaths(items: MenuItem[]): string[] {
  const paths: string[] = [];
  
  function traverse(item: MenuItem) {
    if (item.path) {
      paths.push(item.path);
    }
    if (item.children) {
      item.children.forEach(traverse);
    }
  }
  
  items.forEach(traverse);
  return paths;
}

console.log("All menu paths:", getAllPaths(menu));

// ============================================================================
// Key Points About Recursive Types
// ============================================================================

console.log("\n=== Recursive Types ===");
console.log("Key Points:");
console.log("1. Types can reference themselves in their definition");
console.log("2. Useful for tree structures, linked lists, nested data");
console.log("3. Can be used with interfaces, type aliases, and generics");
console.log("4. Support mutual recursion (types referencing each other)");
console.log("5. Can create deep utility types (DeepReadonly, DeepPartial)");
console.log("6. Be careful with infinite recursion in type definitions");
console.log("7. TypeScript handles recursive types efficiently");
console.log("8. Useful for representing complex data structures");

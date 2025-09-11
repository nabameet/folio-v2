# Development Guidelines & Standards

## 📖 Overview

This document outlines the coding standards, architecture patterns, and best practices for our codebase. These guidelines ensure consistency, maintainability, and high code quality across the entire project.

**Target Audience:** Developers, AI assistants, and code reviewers working on this project.

## 🏗️ Architecture & File Structure

### Directory Organization
```
src/
├── components/
│   ├── ui/             # Complete UI component systems
│   │   ├── button.tsx          # Button + all variants
│   │   ├── card.tsx            # Card + CardHeader + CardContent + CardFooter
│   │   ├── table.tsx           # Table + TableRow + TableCell + TableHead + etc.
│   │   ├── dialog.tsx          # Dialog + DialogContent + DialogHeader + etc.
│   │   └── form.tsx            # Form + FormItem + FormLabel + FormControl + etc.
│   └── [feature]/      # Feature-specific composed components
│       ├── auth/               # Authentication related components
│       ├── dashboard/          # Dashboard specific components
│       └── settings/           # Settings page components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── styles/             # Global styles and CSS variables
```

### Component Architecture Principles

#### 1. **Unified Component Files**
Each UI component file contains ALL related sub-components in a single file:

```typescript
// ✅ Good: Complete component system in one file
// components/ui/card.tsx
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

// ❌ Bad: Separate files for related components
// components/ui/card/Card.tsx
// components/ui/card/CardHeader.tsx
// components/ui/card/CardContent.tsx
```

#### 2. **Single Import Pattern**
Import entire component families from one source:

```typescript
// ✅ Good: Single import for component family
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ❌ Bad: Multiple imports from different files
import { Card } from "@/components/ui/card/Card";
import { CardHeader } from "@/components/ui/card/CardHeader";
import { CardContent } from "@/components/ui/card/CardContent";
```

## 💻 Code Standards

### Clean Code Principles

#### 1. **Single Responsibility**
Each function and component should have one clear purpose:

```typescript
// ✅ Good: Single responsibility
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ❌ Bad: Multiple responsibilities
const formatAndValidateUserInput = (input: string, type: 'email' | 'currency') => {
  if (type === 'email') {
    // validation logic
  } else if (type === 'currency') {
    // formatting logic
  }
};
```

#### 2. **Clear Naming**
Use descriptive, self-explanatory names:

```typescript
// ✅ Good: Descriptive names
const calculateTotalPrice = (items: CartItem[]): number => { /* ... */ };
const isUserAuthenticated = (): boolean => { /* ... */ };
const fetchUserProfile = async (userId: string): Promise<UserProfile> => { /* ... */ };

// ❌ Bad: Unclear names
const calc = (items: any[]): number => { /* ... */ };
const check = (): boolean => { /* ... */ };
const getData = async (id: string): Promise<any> => { /* ... */ };
```

#### 3. **No Magic Numbers**
Use named constants for all hardcoded values:

```typescript
// ✅ Good: Named constants
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT_MS = 5000;
const DEFAULT_PAGE_SIZE = 20;

const retryApiCall = async () => {
  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    // retry logic
  }
};

// ❌ Bad: Magic numbers
const retryApiCall = async () => {
  for (let attempt = 0; attempt < 3; attempt++) { // What does 3 mean?
    // retry logic
  }
};
```

### Component Implementation Standards

#### 1. **Complete Component Structure**
```typescript
/**
 * Card component with all related sub-components
 * Provides a flexible container with header, content, and footer sections
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 */

import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Export all components from single file
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
};
```

#### 2. **Variant System with CVA**
Use `class-variance-authority` for consistent component variants:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

#### 3. **Utility Functions**
Core utility setup in `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with proper Tailwind CSS class merging
 * Handles conflicts and ensures proper specificity
 * 
 * @param inputs - Class names, conditionals, or arrays to merge
 * @returns Merged class string with conflicts resolved
 * 
 * @example
 * cn("px-2 py-1", "px-4", { "bg-red-500": isError }) 
 * // Returns: "py-1 px-4 bg-red-500" (if isError is true)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### TypeScript Standards

#### 1. **Comprehensive Type Definitions**
```typescript
// ✅ Good: Detailed interface with documentation
interface UserProfile {
  /** Unique user identifier */
  id: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** User's role in the system */
  role: 'admin' | 'user' | 'moderator';
  /** Account creation timestamp */
  createdAt: Date;
  /** Last login timestamp, null if never logged in */
  lastLoginAt: Date | null;
}

// ❌ Bad: Vague or missing types
interface User {
  id: any;
  name: string;
  email: string;
  role: string;
  dates: any[];
}
```

#### 2. **Proper Component Props**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /** Size of the button */
  size?: "default" | "sm" | "lg" | "icon";
  /** Render as child component using Radix Slot */
  asChild?: boolean;
  /** Loading state */
  isLoading?: boolean;
}
```

### Documentation Standards

#### 1. **JSDoc Comments**
Every public function, component, and complex logic block must have JSDoc:

```typescript
/**
 * Fetches user data from the API with caching and error handling
 * 
 * @param userId - The unique identifier for the user
 * @param options - Additional fetch options
 * @param options.includeProfile - Whether to include profile information
 * @param options.timeout - Request timeout in milliseconds
 * @returns Promise resolving to user data
 * 
 * @throws {UserNotFoundError} When user doesn't exist
 * @throws {NetworkError} When request fails
 * 
 * @example
 * const user = await fetchUser("123", { includeProfile: true });
 * console.log(user.name);
 */
const fetchUser = async (
  userId: string, 
  options: {
    includeProfile?: boolean;
    timeout?: number;
  } = {}
): Promise<UserData> => {
  // Implementation
};
```

#### 2. **Inline Comments for Complex Logic**
```typescript
// ✅ Good: Explain the "why"
// We debounce search to avoid overwhelming the API with requests
// 300ms provides good UX without being too aggressive
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
);

// Calculate pagination bounds to ensure we don't exceed total pages
// This handles edge cases where totalItems changes during navigation
const maxPage = Math.ceil(totalItems / itemsPerPage);
const safePage = Math.min(currentPage, maxPage);

// ❌ Bad: Explain the "what" (code already shows this)
// Set the search value to the debounced search function
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
);
```

## 🎨 Styling Guidelines

### Tailwind CSS Standards

#### 1. **Class Preservation**
**CRITICAL:** When refactoring, preserve ALL existing Tailwind classes exactly:

```typescript
// ✅ Good: Preserve exact classes during refactoring
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

// ❌ Bad: Changing classes during refactoring
<button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md">
  Click me
</button>
```

#### 2. **Class Name Merging**
Use the `cn()` utility for conditional classes:

```typescript
// ✅ Good: Proper class merging
<button
  className={cn(
    "px-4 py-2 rounded-md font-medium",
    {
      "bg-red-500 text-white": variant === "danger",
      "bg-gray-200 text-gray-800": variant === "secondary",
    },
    className
  )}
>
  {children}
</button>

// ❌ Bad: String concatenation
<button
  className={`px-4 py-2 rounded-md font-medium ${
    variant === "danger" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
  } ${className}`}
>
  {children}
</button>
```

### Visual Consistency
- **Exact Visual Parity:** Any refactoring must maintain identical appearance
- **Responsive Behavior:** Preserve all breakpoint-specific styling
- **Hover States:** Maintain all interactive state styling
- **Animations:** Keep all transitions and animations identical

## 🔄 Custom Hooks

### Hook Structure
```typescript
/**
 * Custom hook for managing local storage with TypeScript support
 * 
 * @param key - Storage key
 * @param initialValue - Default value if key doesn't exist
 * @returns Tuple of [value, setValue] similar to useState
 * 
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Implementation with proper error handling
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

## 🚨 Critical Rules

### Non-Negotiable Requirements

#### 1. **Visual Preservation**
- UI must look **exactly** the same after refactoring
- No changes to colors, spacing, fonts, or layouts
- All animations and hover states preserved
- Responsive behavior maintained

#### 2. **Functional Preservation**
- All features must work identically
- No breaking changes to user flows
- API integrations remain unchanged
- State management behavior preserved

#### 3. **No CMS Folder Changes**
- The `src/cms/` folder is **off-limits**
- Do not modify, refactor, or restructure anything in `/src/cms/`
- CMS-related imports can be updated if file paths change

## ✅ Quality Checklist

Before submitting any code changes:

### Code Quality
- [ ] All components follow single responsibility principle
- [ ] No code duplication exists
- [ ] Functions are under 20 lines when possible
- [ ] All magic numbers replaced with named constants
- [ ] TypeScript types are comprehensive and accurate

### Documentation
- [ ] JSDoc comments on all public APIs
- [ ] Complex logic has explanatory comments
- [ ] Component examples provided in documentation
- [ ] Type definitions include descriptions

### Architecture
- [ ] Components organized in unified files
- [ ] Related sub-components exported together
- [ ] Clean import/export structure
- [ ] Feature components separated from UI components

### Visual & Functional
- [ ] UI looks identical to original
- [ ] All Tailwind classes preserved exactly
- [ ] All interactions work as before
- [ ] Responsive behavior maintained
- [ ] No performance regressions

### Testing
- [ ] All existing tests pass
- [ ] New functionality has appropriate tests
- [ ] Edge cases handled properly
- [ ] Error states managed gracefully

## 🎯 Success Metrics

A successful refactor achieves:

1. **100% Visual Parity** - Pixel-perfect match with original
2. **100% Functional Parity** - All features work identically  
3. **Improved Maintainability** - Cleaner, more organized code
4. **Better Developer Experience** - Easier to understand and modify
5. **Enhanced Type Safety** - Comprehensive TypeScript coverage
6. **Complete Documentation** - Every public API documented

---

## 📝 Final Notes

These guidelines ensure our codebase remains:
- **Consistent** across all contributors
- **Maintainable** for long-term development
- **Scalable** as the project grows
- **Accessible** to new team members
- **Professional** in quality and structure

When in doubt, prioritize clarity, consistency, and user experience preservation above all else.
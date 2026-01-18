/**
 * Helper functions for common operations
 */

/**
 * Check if a value is null or undefined
 * @param value - The value to check
 * @returns true if value is null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if a string is empty or whitespace only
 * @param str - The string to check
 * @returns true if string is empty or contains only whitespace
 */
export function isEmptyString(str: string): boolean {
  return typeof str !== "string" || str.trim().length === 0;
}

/**
 * Deep clone an object
 * @param obj - The object to clone
 * @returns A deep copy of the object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as T;
  }

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * Merge multiple objects into one
 * @param objects - Objects to merge
 * @returns A new object with all properties merged
 */
export function mergeObjects<T extends Record<string, unknown>>(
  ...objects: Partial<T>[]
): T {
  return objects.reduce((result, obj) => {
    return { ...result, ...obj };
  }, {} as T);
}

/**
 * Capitalize the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
  if (isEmptyString(str)) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Delay execution for a given number of milliseconds
 * @param ms - Number of milliseconds to delay
 * @returns A promise that resolves after the delay
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique ID string
 * @returns A unique identifier string
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

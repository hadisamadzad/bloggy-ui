export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; errorMessage: string };

// overloads allow calling `ok()` for void results, or `ok(value)` for values
export function ok(): Result<void>;
export function ok<T>(value: T): Result<T>;
export function ok<T>(value?: T): Result<T | void> {
  return { ok: true, value: (value as unknown) as T };
}

export const fail = <T = never>(errorMessage: string): Result<T> => ({ ok: false, errorMessage });

export default Result;
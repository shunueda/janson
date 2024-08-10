export type Class<T> = (new (...args: unknown[]) => T) | AbstractClass<T>

export type AbstractClass<T> = abstract new (...args: unknown[]) => T

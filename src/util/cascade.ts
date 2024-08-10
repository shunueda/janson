export function cascade<T>(initialValue: T, predicates: ((value: T) => T | undefined)[]): T | undefined {
  return predicates.reduce<T | undefined>((currentValue, transformer) => {
    return currentValue !== undefined ? transformer(currentValue) : undefined
  }, initialValue)
}

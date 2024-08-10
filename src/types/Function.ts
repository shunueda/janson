export type UniFunction<Args extends [unknown], R> = (...args: Args) => R
export type BiFunction<Args extends [unknown, unknown], R> = (...args: Args) => R
export type TriFunction<Args extends [unknown, unknown, unknown], R> = (...args: Args) => R

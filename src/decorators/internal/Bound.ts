export function Bound<T>(_: unknown, context: ClassMethodDecoratorContext<T>) {
  const methodName = context.name as keyof T
  if (context.private) {
    throw new Error(`Method ${String(methodName)} is private and cannot be @${Bound.name}`)
  }
  context.addInitializer(function () {
    // biome-ignore lint/complexity/noBannedTypes: This is a valid use case for `bind`
    this[methodName] = (this[methodName] as Function).bind(this)
  })
}

import type { Class } from '@/types/Types'

const symbol = Symbol(`__${ReifyInheritance.name}__`)

export function ReifyInheritance(...classes: Class<unknown>[]) {
  return (_: unknown, context: ClassDecoratorContext) => {
    context.addInitializer(function () {
      getInheritedClasses(this).push(...classes)
    })
  }
}

export function inherits<T>(object: any, clazz: Class<T>): boolean {
  return getInheritedClasses(object?.constructor)
    .map(it => it.name)
    .includes(clazz.name)
}

function getInheritedClasses(object: any) {
  return (object[symbol] ??= []) as Class<unknown>[]
}

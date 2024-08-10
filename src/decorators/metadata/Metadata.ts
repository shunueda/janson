import type { AbstractDecorator } from '@/decorators/internal/AbstractDecorator'
import { inherits } from '@/decorators/internal/ReifyInheritance'
import type { Transformer } from '@/decorators/transformer/Transformer'
import type { ObjectKey } from '@/types/Json'
import type { AbstractClass } from '@/types/Types'
import Janson from 'janson'

export class Metadata<
  Context extends DecoratorContext = DecoratorContext,
  Args extends unknown[] = unknown[]
> extends Map<ObjectKey, AbstractDecorator<Context, Args>[]> {
  private constructor(object: object | null) {
    if (!object) {
      super()
      return
    }
    if (!object.constructor[Symbol.metadata]) {
      object.constructor[Symbol.metadata] = {}
    }
    super(
      // biome-ignore lint/style/noNonNullAssertion: Check is done above
      (object.constructor[Symbol.metadata]![Janson.name] ??= new Map()) as Map<
        ObjectKey,
        AbstractDecorator<Context, Args>[]
      >
    )
  }

  public static from<Context extends DecoratorContext, Args extends unknown[]>(
    object: object | null
  ): Metadata<Context, Args> {
    return new Metadata(object)
  }

  public getForKey(key: ObjectKey) {
    return this.get(key) ?? []
  }

  public getForKeyFilterd<T extends Transformer>(key: ObjectKey, type: AbstractClass<T>): T[] {
    return this.getForKey(key).filter(it => inherits(it, type)) as unknown as T[]
  }
}

import { AbstractDecorator } from '@/decorators/internal/AbstractDecorator'
import { Bound } from '@/decorators/internal/Bound'
import { ReifyInheritance } from '@/decorators/internal/ReifyInheritance'
import { OutboundValueTransformer } from '@/decorators/transformer/OutboundValueTransformer'
import type { UniFunction } from '@/types/Function'
import type { JsonValue } from '@/types/Json'

@ReifyInheritance(OutboundValueTransformer)
export class JsonSerialize<T>
  extends AbstractDecorator<ClassFieldDecoratorContext<unknown, T>, [UniFunction<[T], JsonValue>]>
  implements OutboundValueTransformer<T>
{
  @Bound
  outboundValueTransformer(value: T): JsonValue {
    return this.args[0](value)
  }
}

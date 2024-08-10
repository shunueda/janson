import { AbstractDecorator } from '@/decorators/internal/AbstractDecorator'
import { Bound } from '@/decorators/internal/Bound'
import { ReifyInheritance } from '@/decorators/internal/ReifyInheritance'
import { InboundValueTransformer } from '@/decorators/transformer/InboundValueTransformer'
import type { UniFunction } from '@/types/Function'
import type { JsonValue } from '@/types/Json'

@ReifyInheritance(InboundValueTransformer)
export class JsonDeserialize<T>
  extends AbstractDecorator<ClassFieldDecoratorContext<unknown, T>, [UniFunction<[JsonValue], T>]>
  implements InboundValueTransformer<T>
{
  @Bound
  inboundValueTransformer(incomingValue: JsonValue): T {
    return this.args[0](incomingValue)
  }
}

import { AbstractDecorator } from '@/decorators/internal/AbstractDecorator'
import { Bound } from '@/decorators/internal/Bound'
import { ReifyInheritance } from '@/decorators/internal/ReifyInheritance'
import { InboundKeyTransformer } from '@/decorators/transformer/InboundKeyTransformer'
import { OutboundKeyTransformer } from '@/decorators/transformer/OutboundKeyTransformer'
import type { ObjectKey } from '@/types/Json'

@ReifyInheritance(InboundKeyTransformer, OutboundKeyTransformer)
export class JsonName
  extends AbstractDecorator<ClassFieldDecoratorContext, [string]>
  implements InboundKeyTransformer, OutboundKeyTransformer
{
  @Bound
  inboundKeyTransformer(): ObjectKey | undefined {
    return undefined
  }

  @Bound
  outboundKeyTransformer(): string | undefined {
    return this.args[0]
  }
}

import { AbstractDecorator } from '@/decorators/internal/AbstractDecorator'
import { Bound } from '@/decorators/internal/Bound'
import { ReifyInheritance } from '@/decorators/internal/ReifyInheritance'
import { OutboundKeyTransformer } from '@/decorators/transformer/OutboundKeyTransformer'

@ReifyInheritance(OutboundKeyTransformer)
export class JsonIgnore extends AbstractDecorator<ClassFieldDecoratorContext, []> implements OutboundKeyTransformer {
  @Bound
  outboundKeyTransformer(): string | undefined {
    return undefined
  }
}

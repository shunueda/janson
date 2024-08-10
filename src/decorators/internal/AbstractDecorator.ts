import { Bound } from '@/decorators/internal/Bound'
import type { Metadata } from '@/decorators/metadata/Metadata'
import Janson from 'janson'

export abstract class AbstractDecorator<Context extends DecoratorContext, Args extends unknown[]> {
  protected args: Args
  protected context: Context = {} as Context

  constructor(...args: Args) {
    this.args = args
  }

  @Bound
  public definition() {
    return (_: unknown, context: Context) => {
      this.context = context
      const metadata = this.getJansonMetadata()
      const contextName = this.context.name
      if (!contextName) {
        return
      }
      metadata.set(contextName, [this, ...(metadata.get(contextName) || [])])
    }
  }

  @Bound
  private getJansonMetadata(): Metadata<Context, Args> {
    return (this.context.metadata[Janson.name] ??= new Map()) as Metadata<Context, Args>
  }
}

import type { Transformer } from '@/decorators/transformer/Transformer'
import type { JsonValue } from '@/types/Json'

export abstract class InboundValueTransformer<R> implements Transformer {
  abstract inboundValueTransformer(incomingValue: JsonValue): R
}

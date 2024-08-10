import type { Transformer } from '@/decorators/transformer/Transformer'
import type { JsonValue } from '@/types/Json'

export abstract class OutboundValueTransformer<T> implements Transformer {
  abstract outboundValueTransformer(value: T): JsonValue
}

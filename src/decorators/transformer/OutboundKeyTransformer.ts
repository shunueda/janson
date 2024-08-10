import type { Transformer } from '@/decorators/transformer/Transformer'
import type { ObjectKey } from '@/types/Json'

export abstract class OutboundKeyTransformer implements Transformer {
  abstract outboundKeyTransformer(key: ObjectKey): string | undefined
}

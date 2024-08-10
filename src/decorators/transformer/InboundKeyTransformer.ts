import type { Transformer } from '@/decorators/transformer/Transformer'
import type { ObjectKey } from '@/types/Json'

export abstract class InboundKeyTransformer implements Transformer {
  abstract inboundKeyTransformer(key: string): ObjectKey | undefined
}

import { Metadata } from '@/decorators/metadata/Metadata'
import { InboundValueTransformer } from '@/decorators/transformer/InboundValueTransformer'
import type { Class } from '@/types/Types'

export function parse<T>(text: string, clazz?: Class<T>): T {
  const metadata = Metadata.from(clazz?.prototype)
  return JSON.parse(text, (key, value) => {
    return metadata.getForKeyFilterd(key, InboundValueTransformer).at(0)?.inboundValueTransformer(value) ?? value
  }) as T
}

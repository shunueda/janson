import { Metadata } from '@/decorators/metadata/Metadata'
import { OutboundKeyTransformer } from '@/decorators/transformer/OutboundKeyTransformer'
import { OutboundValueTransformer } from '@/decorators/transformer/OutboundValueTransformer'
import { cascade } from '@/util/cascade'

export function stringify(obj: any, space: number): string | undefined {
  return stringifyInner(obj, space, 0)
}

function stringifyInner(node: any, space: number, level: number): string | undefined {
  const spaceStr = ' '.repeat(space)
  const colonSeparator = spaceStr ? ': ' : ':'
  const indent = spaceStr ? `\n${spaceStr.repeat(level)}` : ''
  if (node === undefined) {
    return node
  }
  if (typeof node?.toJSON === 'function') {
    return stringifyInner(node.toJSON(), space, level)
  }
  if (typeof node !== 'object' || node === null) {
    return JSON.stringify(node)
  }
  if (Array.isArray(node)) {
    const out = node.map(it => {
      const item = stringifyInner(it, space, level + 1) ?? JSON.stringify(null)
      return indent + spaceStr + item
    })
    return `[${joinWithIndent(out, indent)}]`
  }
  const metadata = Metadata.from(node as object)
  const out = Object.keys(node)
    .map(key => {
      const transformedKey = cascade(
        key,
        metadata.getForKeyFilterd(key, OutboundKeyTransformer).map(it => it.outboundKeyTransformer)
      )
      const value = stringifyInner(node[key], space, level + 1)
      const transformedValue = cascade(
        value,
        metadata.getForKeyFilterd(key, OutboundValueTransformer).map(it => it.outboundValueTransformer)
      )
      if (!value || !transformedKey) {
        return ''
      }
      return indent + spaceStr + JSON.stringify(transformedKey) + colonSeparator + transformedValue
    })
    .filter(Boolean)
  return `{${joinWithIndent(out, indent)}}`
}

function joinWithIndent(array: string[], indent: string): string {
  return array.length ? array.join(',') + indent : ''
}

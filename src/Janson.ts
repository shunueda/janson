import { parse } from '@/json/parse'
import { stringify } from '@/json/stringify'
import type { Class } from '@/types/Types'

export default class Janson {
  public static stringify(object: any, space = 0): string | undefined {
    return stringify(object, space)
  }

  public static parse<T>(text: string, clazz?: Class<T>): T {
    return parse<T>(text, clazz)
  }
}

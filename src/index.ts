import './polyfill'

import { JsonDeserialize as JsonDeserializeImpl } from '@/decorators/JsonDeserialize'
import { JsonIgnore as JsonIgnoreImpl } from '@/decorators/JsonIgnore'
import { JsonName as JsonNameImpl } from '@/decorators/JsonName'
import { JsonSerialize as JsonSerializeImpl } from '@/decorators/JsonSerialize'
import type { JsonValue } from '@/types/Json'

export const JsonIgnore = new JsonIgnoreImpl().definition()

export function JsonName(name: string) {
  return new JsonNameImpl(name).definition()
}

export function JsonSerialize<T>(transform: (value: T) => JsonValue) {
  return new JsonSerializeImpl<T>(transform).definition()
}

export function JsonDeserialize<T>(transform: (value: JsonValue) => T) {
  return new JsonDeserializeImpl<T>(transform).definition()
}

export { default } from './Janson'

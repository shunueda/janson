import { strictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import Janson from 'janson'

describe(import.meta.filename, () => {
  test('Basic', () => {
    strictEqual(Janson.name, 'Janson')
  })
})

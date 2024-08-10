import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import Janson from 'janson'
import { objects } from 'test/constants/objects'

describe(import.meta.filename, () => {
  Object.entries(objects).forEach(([name, object]) => {
    test(name, () => {
      equal(Janson.stringify(object), JSON.stringify(object))
    })

    test(`${name} (with space)`, () => {
      equal(Janson.stringify(object, 2), JSON.stringify(object, null, 2))
    })
  })
})

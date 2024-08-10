import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import Janson from 'janson'
import { objects } from 'test/constants/objects'

describe(import.meta.filename, () => {
  Object.entries(objects).forEach(([name, object]) => {
    test(name, () => {
      const jsonString = JSON.stringify(object)
      deepStrictEqual(Janson.parse(jsonString), JSON.parse(jsonString))
    })
  })
})

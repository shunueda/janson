import { deepStrictEqual } from 'node:assert'
import { describe, test } from 'node:test'
import Janson, { JsonDeserialize } from 'janson'

describe(import.meta.filename, () => {
  class Person {
    @JsonDeserialize(it => new Date(String(it)))
    birthday: Date = new Date()

    // address: Address = new Address()
  }

  class Address {
    @JsonDeserialize(it => it?.toString().toUpperCase())
    city = 'NEW YORK'
  }

  test('JsonDeserialize basic', () => {
    deepStrictEqual(
      Janson.parse(
        JSON.stringify({
          birthday: '2000-01-01T00:00:00'
        }),
        Person
      ),
      {
        birthday: new Date('2000-01-01T00:00:00')
      } satisfies Person
    )
  })
})

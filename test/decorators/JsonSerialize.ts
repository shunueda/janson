import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import Janson, { JsonSerialize } from 'janson'

describe(import.meta.filename, () => {
  class Person {
    @JsonSerialize(it => it.toUpperCase())
    firstName = 'John'
    @JsonSerialize(it => it.toLowerCase())
    lastName = 'Doe'
  }

  class Address {
    @JsonSerialize(it => it.toUpperCase())
    street = '123 Main St'
    @JsonSerialize(it => it.toLowerCase())
    city = 'Metropolis'
    @JsonSerialize(it => it.replace(/(\d{5})/, '*****'))
    zip = '12345'
  }

  class ComplexPerson {
    firstName = 'Jane'
    lastName = 'Smith'
    address: Address = new Address()
  }

  class MixedTypes {
    @JsonSerialize(it => it * 2)
    numberField = 10
    @JsonSerialize(it => !it)
    booleanField = true
  }

  test('JsonSerialize basic', () => {
    equal(
      Janson.stringify(new Person()),
      JSON.stringify({
        firstName: 'JOHN',
        lastName: 'doe'
      })
    )
  })

  test('JsonSerialize with nested object', () => {
    equal(
      Janson.stringify(new ComplexPerson()),
      JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        address: {
          street: '123 MAIN ST',
          city: 'metropolis',
          zip: '*****'
        }
      })
    )
  })

  test('JsonSerialize with non-string types', () => {
    equal(
      Janson.stringify(new MixedTypes()),
      JSON.stringify({
        numberField: 20,
        booleanField: false
      })
    )
  })

  test('JsonSerialize with custom transformation on nested objects', () => {
    const customAddress = new ComplexPerson()
    customAddress.address.city = 'GOTHAM'
    equal(
      Janson.stringify(customAddress),
      JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        address: {
          street: '123 MAIN ST',
          city: 'gotham',
          zip: '*****'
        }
      })
    )
  })
})

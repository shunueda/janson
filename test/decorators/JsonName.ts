import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import Janson, { JsonName } from 'janson'

describe(import.meta.filename, () => {
  class Person {
    @JsonName('first_name')
    firstName = 'John'

    @JsonName('last_name')
    lastName = 'Doe'
  }

  class Address {
    @JsonName('street_address')
    street = '123 Main St'

    @JsonName('city')
    city = 'Metropolis'

    @JsonName('zip_code')
    zip = '12345'
  }

  class ComplexPerson {
    @JsonName('first_name')
    firstName = 'Jane'

    @JsonName('last_name')
    lastName = 'Smith'

    @JsonName('address_us')
    address: Address = new Address()
  }

  test('JsonName basic', () => {
    equal(
      Janson.stringify(new Person()),
      JSON.stringify({
        first_name: 'John',
        last_name: 'Doe'
      })
    )
  })

  test('JsonName with multiple properties', () => {
    equal(
      Janson.stringify(new Address()),
      JSON.stringify({
        street_address: '123 Main St',
        city: 'Metropolis',
        zip_code: '12345'
      })
    )
  })

  test('JsonName with nested object', () => {
    equal(
      Janson.stringify(new ComplexPerson()),
      JSON.stringify({
        first_name: 'Jane',
        last_name: 'Smith',
        address_us: {
          street_address: '123 Main St',
          city: 'Metropolis',
          zip_code: '12345'
        }
      })
    )
  })

  test('JsonName with empty object', () => {
    class EmptyObject {}

    equal(Janson.stringify(new EmptyObject()), JSON.stringify({}))
  })

  test('JsonName with undefined property', () => {
    class IncompletePerson {
      @JsonName('first_name')
      firstName = 'Alice'

      @JsonName('middle_name')
      middleName?: string // intentionally left undefined
    }

    equal(
      Janson.stringify(new IncompletePerson()),
      JSON.stringify({
        first_name: 'Alice'
      })
    )
  })

  test('JsonName with renamed property', () => {
    class RenamedPerson {
      @JsonName('first')
      firstName = 'Bob'

      @JsonName('surname')
      lastName = 'Brown'
    }

    equal(
      Janson.stringify(new RenamedPerson()),
      JSON.stringify({
        first: 'Bob',
        surname: 'Brown'
      })
    )
  })

  test('JsonName with null value', () => {
    class NullablePerson {
      @JsonName('first_name')
      firstName: string | null = null

      @JsonName('last_name')
      lastName = 'Nuller'
    }

    equal(
      Janson.stringify(new NullablePerson()),
      JSON.stringify({
        first_name: null,
        last_name: 'Nuller'
      })
    )
  })

  test('JsonName with array of objects', () => {
    class Group {
      @JsonName('group_name')
      name = 'Developers'

      @JsonName('members')
      members: Person[] = [new Person(), new Person()]
    }

    equal(
      Janson.stringify(new Group()),
      JSON.stringify({
        group_name: 'Developers',
        members: [
          {
            first_name: 'John',
            last_name: 'Doe'
          },
          {
            first_name: 'John',
            last_name: 'Doe'
          }
        ]
      })
    )
  })

  test('JsonName with deep nested structure', () => {
    class Department {
      @JsonName('department_name')
      name = 'Engineering'

      @JsonName('head')
      head: ComplexPerson = new ComplexPerson()
    }

    class Company {
      @JsonName('company_name')
      name = 'TechCorp'

      @JsonName('departments')
      departments: Department[] = [new Department()]
    }

    equal(
      Janson.stringify(new Company()),
      JSON.stringify({
        company_name: 'TechCorp',
        departments: [
          {
            department_name: 'Engineering',
            head: {
              first_name: 'Jane',
              last_name: 'Smith',
              address_us: {
                street_address: '123 Main St',
                city: 'Metropolis',
                zip_code: '12345'
              }
            }
          }
        ]
      })
    )
  })

  test('JsonName with custom property types', () => {
    class PersonWithDate {
      @JsonName('first_name')
      firstName = 'Alice'

      @JsonName('birth_date')
      birthDate: Date = new Date('1990-01-01')
    }

    equal(
      Janson.stringify(new PersonWithDate()),
      JSON.stringify({
        first_name: 'Alice',
        birth_date: '1990-01-01T00:00:00.000Z'
      })
    )
  })

  test('JsonName with Boolean property', () => {
    class BooleanPerson {
      @JsonName('first_name')
      firstName = 'Eve'

      @JsonName('is_admin')
      isAdmin = true
    }

    equal(
      Janson.stringify(new BooleanPerson()),
      JSON.stringify({
        first_name: 'Eve',
        is_admin: true
      })
    )
  })

  test('JsonName with number property', () => {
    class NumberPerson {
      @JsonName('first_name')
      firstName = 'Number'

      @JsonName('age')
      age = 30
    }

    equal(
      Janson.stringify(new NumberPerson()),
      JSON.stringify({
        first_name: 'Number',
        age: 30
      })
    )
  })

  test('JsonName with custom object property', () => {
    class CustomType {
      @JsonName('custom_value')
      value = 42
    }

    class PersonWithCustomType {
      @JsonName('first_name')
      firstName = 'Charlie'

      @JsonName('custom_type')
      customType: CustomType = new CustomType()
    }

    equal(
      Janson.stringify(new PersonWithCustomType()),
      JSON.stringify({
        first_name: 'Charlie',
        custom_type: {
          custom_value: 42
        }
      })
    )
  })
})

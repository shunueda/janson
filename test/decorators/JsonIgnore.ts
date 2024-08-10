import { equal } from 'node:assert'
import { describe, test } from 'node:test'
import Janson, { JsonIgnore, JsonName } from 'janson'

describe(import.meta.filename, () => {
  class Person {
    @JsonName('first_name')
    firstName = 'John'

    @JsonIgnore
    lastName = 'Doe'
  }

  class Address {
    @JsonName('street_address')
    street = '123 Main St'

    @JsonIgnore
    city = 'Metropolis'

    @JsonName('zip_code')
    zip = '12345'
  }

  class ComplexPerson {
    @JsonName('first_name')
    firstName = 'Jane'

    @JsonIgnore
    lastName = 'Smith'

    @JsonName('address_us')
    address: Address = new Address()
  }

  test('JsonIgnore basic', () => {
    equal(
      Janson.stringify(new Person()),
      JSON.stringify({
        first_name: 'John'
      })
    )
  })

  test('JsonIgnore with multiple properties', () => {
    equal(
      Janson.stringify(new Address()),
      JSON.stringify({
        street_address: '123 Main St',
        zip_code: '12345'
      })
    )
  })

  test('JsonIgnore with nested object', () => {
    equal(
      Janson.stringify(new ComplexPerson()),
      JSON.stringify({
        first_name: 'Jane',
        address_us: {
          street_address: '123 Main St',
          zip_code: '12345'
        }
      })
    )
  })

  test('JsonIgnore with empty object', () => {
    class EmptyObject {}

    equal(Janson.stringify(new EmptyObject()), JSON.stringify({}))
  })

  test('JsonIgnore with undefined property', () => {
    class IncompletePerson {
      @JsonName('first_name')
      firstName = 'Alice'

      @JsonIgnore
      middleName?: string
    }

    equal(
      Janson.stringify(new IncompletePerson()),
      JSON.stringify({
        first_name: 'Alice'
      })
    )
  })

  test('JsonIgnore with renamed property', () => {
    class RenamedPerson {
      @JsonName('first')
      firstName = 'Bob'

      @JsonIgnore
      lastName = 'Brown'
    }

    equal(
      Janson.stringify(new RenamedPerson()),
      JSON.stringify({
        first: 'Bob'
      })
    )
  })

  test('JsonIgnore with null value', () => {
    class NullablePerson {
      @JsonIgnore
      lastName: string | null = null

      @JsonName('first_name')
      firstName = 'Nuller'
    }

    equal(
      Janson.stringify(new NullablePerson()),
      JSON.stringify({
        first_name: 'Nuller'
      })
    )
  })

  test('JsonIgnore with array of objects', () => {
    class Group {
      @JsonName('group_name')
      name = 'Developers'

      @JsonIgnore
      members: Person[] = [new Person(), new Person()]
    }

    equal(
      Janson.stringify(new Group()),
      JSON.stringify({
        group_name: 'Developers'
      })
    )
  })

  test('JsonIgnore with deep nested structure', () => {
    class Department {
      @JsonName('department_name')
      name = 'Engineering'

      @JsonIgnore
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
            department_name: 'Engineering'
          }
        ]
      })
    )
  })

  test('JsonIgnore with custom property types', () => {
    class PersonWithDate {
      @JsonIgnore
      birthDate: Date = new Date('1990-01-01')

      @JsonName('first_name')
      firstName = 'Alice'
    }

    equal(
      Janson.stringify(new PersonWithDate()),
      JSON.stringify({
        first_name: 'Alice'
      })
    )
  })

  test('JsonIgnore with Boolean property', () => {
    class BooleanPerson {
      @JsonName('first_name')
      firstName = 'Eve'

      @JsonIgnore
      isAdmin = true
    }

    equal(
      Janson.stringify(new BooleanPerson()),
      JSON.stringify({
        first_name: 'Eve'
      })
    )
  })

  test('JsonIgnore with number property', () => {
    class NumberPerson {
      @JsonName('first_name')
      firstName = 'Number'

      @JsonIgnore
      age = 30
    }

    equal(
      Janson.stringify(new NumberPerson()),
      JSON.stringify({
        first_name: 'Number'
      })
    )
  })

  test('JsonIgnore with custom object property', () => {
    class CustomType {
      @JsonName('custom_value')
      value = 42
    }

    class PersonWithCustomType {
      @JsonName('first_name')
      firstName = 'Charlie'

      @JsonIgnore
      customType: CustomType = new CustomType()
    }

    equal(
      Janson.stringify(new PersonWithCustomType()),
      JSON.stringify({
        first_name: 'Charlie'
      })
    )
  })
})

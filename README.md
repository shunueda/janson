# Janson

Janson is a lightweight JSON serialization and deserialization library for TypeScript. It provides decorators for controlling how your objects are transformed into JSON and back.

## Features

- **JSON Decorators:**
    - `@JsonName`: Rename properties in your JSON output.
    - `@JsonIgnore`: Exclude properties from JSON serialization.
    - `@JsonSerialize`: Customize how properties are serialized into JSON.
    - `@JsonDeserialize`: Customize how properties are deserialized from JSON.
- **Simple API:**
    - `Janson.stringify(object)`: Serializes an object into JSON.
    - `Janson.parse(jsonString, Class)`: Deserializes a JSON string into an object of the given class.

## Installation

```bash
npm install janson
```

## Usage

```typescript
import Janson, { JsonName, JsonIgnore, JsonSerialize, JsonDeserialize } from 'janson';

class Person {
  @JsonName('first_name')
  firstName: string = 'John';

  @JsonIgnore
  lastName: string = 'Doe';

  @JsonSerialize(it => it.toUpperCase())
  fullName: string = 'John Doe';

  @JsonDeserialize(it => new Date(it))
  birthday: Date = new Date();
}

const person = new Person();

// Serializing to JSON
const jsonString = Janson.stringify(person);
// Output: { "first_name": "John", "fullName": "JOHN DOE" }

// Deserializing from JSON
const parsedPerson: Person = Janson.parse(jsonString, Person);
```

## Example

```typescript
import Janson, { JsonName } from 'janson';

class Address {
  @JsonName('street_address')
  street: string = '123 Main St';

  @JsonName('city')
  city: string = 'New York';

  @JsonName('zip_code')
  zip: string = '10001';
}

class User {
  @JsonName('first_name')
  firstName: string = 'John';

  @JsonName('last_name')
  lastName: string = 'Doe';

  @JsonName('address')
  address: Address = new Address();
}

const user = new User();

const json = Janson.stringify(user);

// Output:
// {
//   "first_name": "John",
//   "last_name": "Doe",
//   "address": {
//     "street_address": "123 Main St",
//     "city": "New York",
//     "zip_code": "10001"
//   }
// }
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License
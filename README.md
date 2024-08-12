# Janson: A JSON Serialization Library for TypeScript

Janson is a lightweight and powerful TypeScript library designed to simplify JSON serialization and deserialization. It provides a set of decorators to enhance your classes and control how they're handled during JSON conversion.

## Features

* **Decorators for Fine-grained Control:**
    * **`@JsonName`:** Rename properties in your JSON output.
    * **`@JsonIgnore`:** Exclude properties from being serialized.
    * **`@JsonSerialize`:** Customize the serialization process for specific properties.
    * **`@JsonDeserialize`:** Apply custom logic when deserializing properties.
* **Simple API:** Janson provides intuitive functions for parsing and stringifying JSON, making integration with your code effortless.
* **TypeScript Compatibility:** Built with TypeScript, Janson offers type safety and code completion, leading to a smoother development experience.

## Installation

```bash
npm install janson
```

## Usage

### Basic Serialization

```typescript
import Janson from 'janson';

class Person {
  firstName = 'John';
  lastName = 'Doe';
}

const person = new Person();
const jsonString = Janson.stringify(person);

console.log(jsonString); // Output: {"firstName":"John","lastName":"Doe"}
```

### Using Decorators

```typescript
import Janson, { JsonName, JsonIgnore, JsonSerialize } from 'janson';

class Address {
  @JsonName('street_address')
  street = '123 Main St';

  @JsonIgnore
  city = 'Metropolis';

  @JsonSerialize(it => it.toUpperCase())
  zip = '12345';
}

const address = new Address();
const addressJson = Janson.stringify(address);

console.log(addressJson); // Output: {"street_address":"123 Main St","zip":"12345"} 
```

### Deserialization

```typescript
import Janson, { JsonDeserialize } from 'janson';

class Person {
  @JsonDeserialize(it => new Date(it))
  birthday: Date = new Date();
}

const jsonString = '{"birthday":"2000-01-01T00:00:00"}';
const person = Janson.parse(jsonString, Person);

console.log(person.birthday); // Output: 2000-01-01T00:00:00.000Z
```

## Examples

For more detailed examples and use cases, refer to the test files within this repository.

## Contributing

Contributions are welcome! Feel free to submit pull requests, report issues, or suggest new features.

## License

Janson is released under the MIT License.
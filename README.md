# Janson

Janson is a lightweight and versatile JSON library for Node.js that empowers you to work seamlessly with JSON data. It simplifies parsing, stringifying, and transforming JSON, offering a streamlined experience for developers.

## Features

* **Effortless Parsing:** Parse JSON strings into JavaScript objects effortlessly with `Janson.parse()`.
* **Flexible Stringification:** Convert JavaScript objects into JSON strings using `Janson.stringify()` with optional indentation for improved readability.
* **Decorators for Enhanced Control:** Utilize decorators to refine the serialization and deserialization process:
    * `@JsonName`: Customize property names in the resulting JSON.
    * `@JsonIgnore`: Exclude specific properties from serialization.
    * `@JsonSerialize`: Define custom transformations for serializing properties.
    * `@JsonDeserialize`: Implement custom deserialization logic for specific properties.
* **Comprehensive Test Coverage:** Janson is rigorously tested to ensure reliability and stability.

## Installation

```bash
npm install janson
```

## Usage

### Parsing

```javascript
const jsonString = '{ "name": "John Doe", "age": 30 }';
const jsonObject = Janson.parse(jsonString);

console.log(jsonObject); // Output: { name: 'John Doe', age: 30 }
```

### Stringifying

```javascript
const person = { name: 'Jane Smith', age: 25 };
const jsonString = Janson.stringify(person);

console.log(jsonString); // Output: {"name":"Jane Smith","age":25}
```

### Decorators

```javascript
import Janson, { JsonName, JsonIgnore, JsonSerialize, JsonDeserialize } from 'janson';

class Person {
  @JsonName('first_name')
  firstName = 'John';

  @JsonIgnore
  lastName = 'Doe';

  @JsonSerialize(it => it.toUpperCase())
  email = 'john.doe@example.com';

  @JsonDeserialize(it => new Date(String(it)))
  birthday: Date = new Date();
}

const person = new Person();
const jsonString = Janson.stringify(person);

console.log(jsonString); // Output: {"first_name":"John","email":"JOHN.DOE@EXAMPLE.COM","birthday":"2023-10-27T00:00:00.000Z"}
```

## Examples

Refer to the `test` directory in the repository for comprehensive examples demonstrating various use cases.

## Contributing

Contributions are welcome! Please submit a pull request with clear and concise descriptions.

## License

Janson is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

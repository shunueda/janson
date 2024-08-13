# Janson

A simple library for parsing and stringifying JSON with decorators for easy customization.

## Installation

```bash
npm install janson
```

## Features

* **Parse JSON:**
  * Parse JSON strings into JavaScript objects.
* **Stringify JSON:**
  * Stringify JavaScript objects into JSON strings.
* **Decorators:**
  * `@JsonName`: Rename a property in the output JSON.
  * `@JsonIgnore`: Exclude a property from the output JSON.
  * `@JsonDeserialize`:  Deserialize a property with a custom function.
  * `@JsonSerialize`:  Serialize a property with a custom function.

## Usage

```javascript
import Janson, { JsonName, JsonIgnore, JsonDeserialize, JsonSerialize } from 'janson';

// Simple example with decorators
class Person {
  @JsonName('first_name')
  firstName = 'John';

  @JsonIgnore
  lastName = 'Doe';
}

const person = new Person();

// Stringify the object with decorators applied
const json = Janson.stringify(person);

// Output:
// {
//   "first_name": "John"
// }

// Deserialize a JSON string into an object with a custom function
class DatePerson {
  @JsonDeserialize(it => new Date(String(it)))
  birthday: Date = new Date();
}

const jsonString = JSON.stringify({ birthday: '2000-01-01T00:00:00' });
const datePerson = Janson.parse(jsonString, DatePerson);

// Output:
// {
//   "birthday": new Date('2000-01-01T00:00:00')
// }
```

## Examples

* [JsonName](test/decorators/JsonName.ts)
* [JsonIgnore](test/decorators/JsonIgnore.ts)
* [JsonDeserialize](test/decorators/JsonDeserialize.ts)
* [JsonSerialize](test/decorators/JsonSerialize.ts)
* [Parse JSON](test/json/parse.ts)
* [Stringify JSON](test/json/stringify.ts)

## License

MIT

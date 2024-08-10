export const objects: Record<string, unknown> = {
  'Empty Object': {},
  'Simple Key-Value Object': {
    stringKey: 'stringValue',
    numberKey: 42,
    booleanKey: true
  },
  'Nested Key-Value Object': { OuterObject: { InnerKey: 'InnerValue' } },
  'Deeply Nested Key-Value Object': {
    Level1: { Level2: { Level3: { Level4Key: 'DeepValue' } } }
  },
  'Mixed Array': [1, 2, 3, 'four', true, null],
  'Nested Arrays': [
    [1, 2],
    [3, 4],
    [5, [6, 7]]
  ],
  'Array of Objects': [{ id: 1 }, { id: 2 }, { id: 3 }],
  'Object Containing Array': { ArrayKey: [1, 2, 3, { NestedObject: 'Value' }] },
  'Complex Mixed Object': {
    StringProperty: 'StringValue',
    NumberProperty: 42,
    BooleanProperty: true,
    NullProperty: null,
    UndefinedProperty: undefined,
    FunctionProperty: () => {},
    SymbolProperty: Symbol('SymbolDescription')
  },
  'Nested Complex Object': {
    InnerObject: { InnerKey: 'InnerValue' },
    InnerArray: [1, 2, 3],
    NestedArrays: [
      [1, 2],
      [3, 4]
    ],
    DeeplyNestedObject: { InnerMostObject: { Key: 'Value' } }
  },
  'Edge Case Values': {
    EmptyString: '',
    ZeroValue: 0,
    FalseValue: false,
    EmptyArray: [],
    EmptyObject: {}
  },
  'Self Referencing Object': { SelfReference: null },
  'Date Object': new Date(),
  'Regular Expression Object': new RegExp(/test/g),
  'Map Object': new Map([
    ['MapKey1', 'MapValue1'],
    ['MapKey2', 'MapValue2']
  ]),
  'Set Object': new Set([1, 2, 3, 4, 5]),
  'Large Array of Similar Objects': Array(1000).fill({ Key: 'Value' }),
  'Large Object with Many Keys': Array.from({ length: 1000 }, (_, i) => [`Key${i}`, i]).reduce(
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  ),
  'Special Number Values': {
    NanValue: Number.NaN,
    InfinityValue: Number.POSITIVE_INFINITY,
    NegativeInfinityValue: Number.NEGATIVE_INFINITY,
    SpecialNumberArray: [undefined, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
  },
  'Typed Arrays': {
    Int8ArrayInstance: new Int8Array([1, 2, 3]),
    Uint8ArrayInstance: new Uint8Array([1, 2, 3]),
    Float32ArrayInstance: new Float32Array([1.1, 2.2, 3.3])
  },
  'Buffer Instance': Buffer.from([1, 2, 3, 4, 5]),
  'Resolved Promise': Promise.resolve('ResolvedValue'),
  'Symbol Keyed Object': { [Symbol('SymbolKey')]: 'SymbolValue' },
  'Nested Array with Objects': [
    { Id: 1, Values: [1, 2, 3] },
    { Id: 2, Values: [4, 5, 6] }
  ],
  'Mixed Data Type Array': [
    { Key: 'Value' },
    [1, 2, 3],
    'StringValue',
    42,
    true,
    null,
    undefined,
    Symbol('SymbolDescription')
  ],
  'Object with Function Property': {
    MethodProperty: () => {
      return 'MethodReturnValue'
    }
  },
  'WeakMap with Objects': new WeakMap([
    [{}, 'Value1'],
    [{}, 'Value2']
  ]),
  'WeakSet with Objects': new WeakSet([{}, {}])
}

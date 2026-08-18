# multi-unit-converter

Parse **measurements in text** — `2km`, `20min`, `50 miles`, `60 km/h` — and **convert them in place** to SI, metric, imperial, or units you configure.

Use `parse()` to extract quantities from documents, `convertText()` to rewrite a string, or `convert()` for a single value. Built for prose and user-facing copy, not one-off `convert(1).from('lb').to('kg')` calls. Conversion math uses [js-quantities](https://github.com/gentooboontoo/js-quantities); this library handles aliases, compounds, ambiguity, and formatting.

```ts
import MultiUnitConverter from 'multi-unit-converter';

const muc = new MultiUnitConverter();

muc.convertText('I ran 2km in 20min');
// 'I ran 2000 m in 1200 s'

muc.parse('I ran 2km in 20min');
// [
//   { value: 2, unit: 'km', category: 'length', siValue: 2000, siUnit: 'm', start: 6, end: 9, ... },
//   { value: 20, unit: 'min', category: 'time', siValue: 1200, siUnit: 's', start: 13, end: 18, ... }
// ]

muc.convert(2, 'km', 'm');
// 2000
```

## How it works

```
┌──────────────────────────────┐
│        convertText()         │  ← natural language
├──────────────────────────────┤
│           parse()            │  ← text → measurements
├──────────────────────────────┤
│          convert()           │  ← measurement → measurement
├──────────────────────────────┤
│       js-quantities          │  ← conversion math
└──────────────────────────────┘
```

1. `parse()` finds numbers and units in the string (including compounds like `km/h`).
2. `convert()` / `convertParsed()` convert using js-quantities, or via SI for custom units.
3. `convertText()` replaces each match in the original string.

## Installation

```bash
npm install multi-unit-converter
```

## Usage

```js
const { MultiUnitConverter } = require('multi-unit-converter');
const muc = new MultiUnitConverter();
```

```ts
import MultiUnitConverter from 'multi-unit-converter';
const muc = new MultiUnitConverter();
```

### Convert text

```js
muc.convertText('The car traveled 50 miles and used 5 gallons of gas.');
// 'The car traveled 80500 m and used 0.0189 m³ of gas.'
```

`50 miles` is exactly **80.4672 km** (80 467.2 m). With the default of 3 significant figures, `convertText()` prints `80500 m`. Raise precision when you need more digits:

```js
muc.convertText('The car traveled 50 miles.', { precision: 6 });
// 'The car traveled 80467.2 m.'

muc.configure({ length: 'km', precision: 4 });
muc.convertText('The car traveled 50 miles.');
// 'The car traveled 80.47 km.'
```

### Parse structured measurements

```js
muc.parse('I ran 2km in 20min');
```

Each match includes `value`, `unit`, `unitName`, `category`, `siValue`, `siUnit`, `start`, `end`, `confidence`, `ambiguous`, and `compound`. That is enough to highlight matches, extract quantities from documents, validate them, or convert only some of them.

```js
const parsed = muc.parse('I ran 2km in 20min');
muc.convertParsed(parsed);
// [{ ..., convertedValue: 2000, convertedUnit: 'm' }, { ..., convertedValue: 1200, convertedUnit: 's' }]
```

### Convert a single value

```js
muc.convert(2, 'km', 'm'); // 2000
muc.convert(32, '°F', '°C'); // 0
muc.convert(2, 'km'); // 2000 — uses the configured length unit (meter by default)
```

## Compound units

```js
muc.convertText('I was driving at 60 km/h');
// 'I was driving at 16.7 m/s'

muc.convertText('I was driving at 60 km/h', { precision: 4 });
// 'I was driving at 16.67 m/s'

muc.convertText('100 kg/m³');
// '100 kg/m³'

muc.convertText('32 ft/s²', { precision: 4 });
// '9.754 m/s²'

muc.convertText('50 miles per hour');
// '22.4 m/s'
```

Supported forms include `km/h`, `m/s`, `kg/m³`, `ft/s²`, `mph`, and `miles per hour` / `meters per second`.

## Numbers

The parser accepts:

```text
2.5 km
2,500 km
-20 °C
+5 °C
.5 kg
5e3 m
1.2×10³ m
1/2 mile
½ mile
2 1/2 miles
```

## Ambiguous units

Some short aliases are ambiguous (`5m` could be meters or minutes, `5 in` could be inches or the preposition *in*).

```js
muc.parse('5 m');  // meters, high confidence, not ambiguous
muc.parse('5m');   // meters, marked ambiguous (minutes is an alternative)
muc.parse('5m', { strict: true }); // [] — strict mode refuses the guess

muc.parse('I put 5 in the box'); // [] — treated as a preposition
muc.parse('The board is 5 in wide'); // inches
```

`convertText(text, { strict: true })` skips ambiguous matches instead of guessing.

## Formatting

```js
muc.convertText(text, {
  precision: 3,              // significant figures (default 3)
  preserveSpacing: true,     // '2km' → '2000m' instead of '2000 m'
  preserveNumberStyle: true, // keep thousands separators when possible
  format: 'short',           // 'm' (default) or 'long' ('meters')
  strict: false,
});
```

```js
muc.convertText('I ran 2km', { format: 'long' });
// 'I ran 2000 meters'
```

## Configuration

```js
muc.configure({
  length: 'm',
  mass: 'kg',
  time: 's',
  temperature: 'K',
  energy: 'J',
  volume: 'm3',
  liquidVolume: 'L',
  current: 'A',
  precision: 4,
});

muc.usePreset('SI');        // default
muc.usePreset('metric');    // everyday metric (°C, L, km/h, …)
muc.usePreset('imperial');  // ft, lb, °F, gal, mph, …
muc.usePreset('us');
muc.usePreset('recipe');    // g, cups, °C
```

Constructor options are the same object:

```js
const muc = new MultiUnitConverter({ length: 'km', precision: 4 });
```

## Custom units

```js
muc.defineUnit({
  name: 'banana',
  category: 'length',
  aliases: ['bananas'],
  toSI: 0.18,
  siUnit: 'm',
});

muc.convertText('The table is 10 bananas long');
// 'The table is 1.8 m long'
```

Use this for domain-specific units. Built-in conversions stay in js-quantities so this library does not maintain its own factor tables.

## API

| Method | Purpose |
| --- | --- |
| `parse(text, options?)` | Structured measurements in `text` |
| `convert(value, from, to?)` | One-shot conversion |
| `convertParsed(parsed, to?)` | Convert `parse()` results |
| `convertText(text, options?)` | Replace measurements in `text` |
| `configure(options)` | Set target units and precision |
| `usePreset(name)` | `SI`, `metric`, `imperial`, `us`, `recipe` |
| `defineUnit(definition)` | Add a custom unit |

Constructor / `configure()` options: `length`, `mass`, `time`, `temperature`, `area`, `volume`, `liquidVolume`, `current`, `pressure`, `energy`, `frequency`, `speed`, `acceleration`, `density`, `precision`.

Thrown errors:

| Error | When |
| --- | --- |
| `InvalidUnitError` | Unknown unit, wrong category, or incompatible conversion |
| `InvalidPresetError` | `usePreset()` gets a name that is not `SI`, `metric`, `imperial`, `us`, or `recipe` |
| `TypeError` | A string/number argument has the wrong type |
| `RangeError` | `precision` is negative |

```ts
import MultiUnitConverter, { InvalidUnitError } from 'multi-unit-converter';

try {
  muc.configure({ length: 'day' });
} catch (error) {
  if (error instanceof InvalidUnitError) {
    // ...
  }
}
```

## Supported categories

Length, mass, time, temperature, area, volume, liquid volume, current, pressure, energy, frequency, speed, acceleration, and density.

Aliases cover common spellings (`meters` / `metres` / `m`, `lbs` / `pounds`, `°C` / `celsius`, …). Conversion factors come from js-quantities. Text aliases live in `src/definitions.ts`.

Temperatures in text are treated as **absolute** values (`30 °C` → `303 K`), not temperature differences.

## License

MIT. See [LICENSE](LICENSE).

## Contributing

Bug reports and pull requests are welcome: [github.com/ItsXrgon/multi-unit-converter](https://github.com/ItsXrgon/multi-unit-converter).

## Contact

ali.koheil@gmail.com

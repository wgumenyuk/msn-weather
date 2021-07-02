<div align="center">
  
  ![Logo](./assets/logo.png)
  
  # MSN Weather API
  A simple MSN Weather API wrapper with built-in TypeScript support.
  
  [![Travis CI](https://img.shields.io/travis/com/wgumenyuk/msn-weather?label=Build&style=flat-square)](https://travis-ci.com/github/wgumenyuk/msn-weather)
  [![Codecov](https://img.shields.io/codecov/c/github/wgumenyuk/msn-weather?label=Coverage&logo=codecov&style=flat-square)](https://codecov.io/gh/wgumenyuk/msn-weather)
  [![Code Climate](https://img.shields.io/codeclimate/maintainability/wgumenyuk/msn-weather?label=Maintainability&logo=Code%20Climate&style=flat-square)](https://codeclimate.com/github/wgumenyuk/msn-weather)
  [![NPM downloads](https://img.shields.io/npm/dt/msn-weather?label=Downloads&style=flat-square)](https://www.npmjs.com/package/msn-weather)
  [![Version](https://img.shields.io/github/package-json/v/wgumenyuk/msn-weather?label=Version&style=flat-square)](https://github.com/wgumenyuk/msn-weather)
  [![License](https://img.shields.io/github/license/wgumenyuk/msn-weather?label=License&style=flat-square)](./LICENSE)
  
  [![NPM install info](https://nodei.co/npm/msn-weather.png?downloads=true&stars=true)](https://www.npmjs.com/package/msn-weather)
</div>

## Table of contents
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [Usage with CommonJS](#usage-with-commonjs)
  - [Retrieved data format](#retrieved-data-format)
  - [API documentation](#api-documentation)
- [Other languages](#other-languages)
- [Resources](#resources)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## About
`msn-weather` is a powerful [Node.js](https://nodejs.org) library that allows you to easily retrieve weather data for any location in the world.
As the name suggests, this wrapper uses the MSN weather API behind the scenes.

- Simple and easy-to-use API
- Built-in TypeScript definitions
- Only one dependency
- Clear weather data format
- Performant

## Installation
Install this package using NPM:

```
$ npm install msn-weather --save
```

## Usage
```typescript
import weather from "msn-weather";

const data = await weather.search({
  location: "Munich, DE",
  language: "en",
  degreeType: "C"
});
```

### Usage with CommonJS
To use this library with CommonJS, use this approach:
```javascript
const weather = require("msn-weather").default;
```

### Retrieved data format
You will receive a JavaScript object looking like this:

<details open="open">
  <summary>Show code</summary>
  
  ```javascript
  {
    current: {
      date: "2021-06-09",
      day: "Wednesday",
      temperature: "23°C",
      sky: {
        code: "partly_sunny",      
        text: "Partly Sunny"        
      },
      observation: {
        time: "12:00:00",
        point: "Munich, BY, Germany"
      },
      feelsLike: "22°C",
      humidity: "58%",
      wind: {
        display: "7 km/h North",    
        speed: "7 km/h"
      }
    },
    forecasts: [
      {
        date: "2021-06-09",
        day: "Wednesday",
        temperature: {
          low: "14°C",
          high: "24°C"
        },
        sky: {
          code: "partly_sunny",
          text: "Partly Sunny"
        },
        precip: "90%"
      },
      {
        date: "2021-06-10",
        day: "Thursday",
        temperature: {
          low: "13°C",
          high: "22°C"
        },
        sky: {
          code: "light_rain",
          text: "Light Rain"
        },
        precip: "100%"
      },
      {
        date: "2021-06-11",
        day: "Friday",
        temperature: {
          low: "15°C",
          high: "23°C"
        },
        sky: {
          code: "light_rain",
          text: "Light Rain"
        },
        precip: "100%"
      },
      {
        date: "2021-06-12",
        day: "Saturday",
        temperature: {
          low: "15°C",
          high: "24°C"
        },
        sky: {
          code: "light_rain",
          text: "Light Rain"
        },
        precip: "100%"
      }
    ]
  }
  ```
</details>

### API documentation
#### `weather.search(options)`
Retrieves weather data for a given location. Returns a promise with weather data (see [retrieved data format](#retrieved-data-format)).

| Parameter | Type                  | Optional | Default | Description             |
|-----------|-----------------------|----------|---------|-------------------------|
| `options` | [`Options`](#options) | ❌       | None    | Options for the search. |

#### `Options`
Options for the search.
| Parameter | Type | Optional | Default | Description |
|-|-|-|-|-|
| `location` | String | ❌ | None | Location for the weather data. |
| `language` | String | ✔  | `en`  | Language in which weather text will be returned. The value must be a [ISO 639.1:2002 language code](https://en.wikipedia.org/wiki/ISO_639-1). |
| `degreeType` | String | ✔ | `C` | Degree type for temperature values. Either Celsius (`C`) or Fahrenheit (`F`). |

## Resources
- [Changelog](./CHANGELOG.md)
- [NPM](https://www.npmjs.com/package/msn-weather)
- [GitHub](https://github.com/wgumenyuk/msn-weather)

## Acknowledgements
- [Logo](https://twemoji.twitter.com) by Twitter Twemoji (licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))

### Contributors
A special thanks goes out to these contributors:

- Khang ([khang-nd](https://github.com/khang-nd)) - Contributing a number of times

## License
This project is licensed under [MIT](./LICENSE).

&copy; 2021 [Wlad Gumenyuk](https://github.com/wgumenyuk)

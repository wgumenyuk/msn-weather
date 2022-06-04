# Changelog

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/).

## 2.1.3 (June 04, 2022)
### Fixed
- Faulty index access giving back first character only

### Changed
- Changed `textID` 11 from `light_rain` to `rain_shower`

## 2.1.2 (August 01, 2021)
### Added
- Added a contributors anchor
- Added a [`encodeURIComponent`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) explanation to API documentation

### Changed
- Replaced version badge with size badge

## 2.1.1 (July 20, 2021)
### Changed
- Switched from `xml2js` to `fast-xml-parser`: this leads to a much smaller bundle size (see [xml2js](https://bundlephobia.com/package/xml2js@0.4.23) vs. [fast-xml-parser](https://bundlephobia.com/package/fast-xml-parser@3.19.0))
- Renamed `utils` directory to `core`
- Renamed `data` directory to `expected`
- Improved tests

## 2.0.1 (July 16, 2021)
### Fixed
- Fixed bad JSDoc for `request` function

## 2.0.0 (July 02, 2021)
### Added
- Added anchor link to retreived data format to describe the returned data better
- Added contributor acknowledgements to README

### Changed
- Changed HTTP to HTTPS ([#2](https://github.com/wgumenyuk/msn-weather/issues/2))

### Fixed
- Broken anchor link in README

## 1.0.2 (June 20, 2021)
### Fixed
- Fixed wrong API documentation ([#1](https://github.com/wgumenyuk/msn-weather/pull/1))
- Fixed broken link in README

### Changed
- Converted language code to lowecase in README

## 1.0.1 (June 10, 2021)
### Added
- Added acknowledgements to README

### Fixed
- Fixed some README typos

## 1.0.0 (June 10, 2021)
### Added
- `search()` method to retrieve weather data 
- Detailed README

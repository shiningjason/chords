Chords - chord shape data library

# Usage

##  NodeJS

```sh
$ npm install --save chord-chart
```

```js
const { name, shapes } = require('chord-chart/guitar/A.json')
```

## REST API

Request

```sh
curl -X GET "https://get-chords.now.sh?names=G,C%23,B,A"

# or

curl -X GET "https://get-chords.now.sh?names=G&names=C%23&names=B&names=A"
```

Response

```json
{
  "A": { ... },
  "B": { ... },
  "C#": { ... },
  "G": { ... },
}
```

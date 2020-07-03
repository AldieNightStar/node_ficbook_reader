# Ficbook Reader for NodeJS

Read contents of your fanfics with such function

# Install
```
npm install --save AldieNightStar/node_ficbook_reader
```

# Usage
```js
let { readFic } = require("ficbook_Reader");

let fic = readFic("https://ficbook.net/readfic/9070940/23203978") // return text if OK and undefined if not
console.log(fic)
```

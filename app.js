const fs = require('fs');
const array = fs.readFileSync('hexTextFile.txt', 'utf8').split('\n');


console.dir(array, {'maxArrayLength': null});

module.exports = array
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'avr8js.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
};
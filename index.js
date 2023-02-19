require('dotenv').config()
const main = require('./bot')

setInterval(() => {
  main()
}, 10000)

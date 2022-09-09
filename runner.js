const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJpZCI6ImQzOTIwMmY5LTk2ZGMtNDg2MC04ODU3LWFiNmViOTliOTcxNS0xNjYyNzU5NjkyNzY4IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiZDdlOTJhMjQtNjA2OS00ODgwLWEyMmMtNTZjMjk4M2NmYzM1IiwidHlwZSI6InQifQ'

cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})
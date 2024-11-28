const dep2 = require('./dep2')
// dpe1에서는 dep2를 require함

consolog('dept2 :', dep2)

function insideDep1() {
   console.log('dept: 2', dep2)
}

module.exports = insideDep1

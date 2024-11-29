const fs = require('fs')

fs.readFile('./readme.txt', (err, data) => {
	if (err) {
		throw err
	}
	console.log('data\n'+data)
	console.log('data.toString()\n' + data.toString())
})

// git commit -m '[version] bump

'use strict'

let exec = require('child_process').exec

let packagePath = '../package.json'
let packageInfo = require(packagePath)
let version= packageInfo.version

exec(`git commit -m "[release] v${version}"`, function (err, stdout, stderr) {
  console.log('git result:', stdout)
})

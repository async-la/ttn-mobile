'use strict'

let exec = require('child_process').exec

let packagePath = '../package.json'
let packageInfo = require(packagePath)
let version = packageInfo.version

exec(`git tag -a v${version} -m "auto release"`, function (err, stdout, stderr) {
  console.log('git result:', stdout)
})

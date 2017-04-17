'use strict'
let fs = require('fs')
let exec = require('child_process').exec

let packagePath = '../package.json'
let packageInfo = require(packagePath)
let versionParts = packageInfo.version.split('.')
let buildInt = parseInt(versionParts[1]) + 1
let newVersion = [versionParts[0], buildInt, 0].join('.')

// DRIVE - use apple's agvtool to update info.plist version
exec('(cd ios && agvtool next-version -all)', function (err, stdout, stderr) {
  if (err) throw err
  if (stderr) throw err
})

exec(`(cd ios && agvtool new-marketing-version ${newVersion})`, function (err, stdout, stderr) {
  if (err) throw err
  if (stderr) throw err

  writeAndroid(`${__dirname}/../android/app/version.properties`, newVersion)
  writePackage(newVersion)
})

// finds the versionName line of version.properties and updates value to the current version
function writeAndroid(filePath, version) {
  console.log('VERSION', version)
  let lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n|\r/)
    .map(function (line) {
      if (!/\s*=\s*/i.test(line)) return line
      let lineParts = line.split('=')
      if (lineParts[0] === 'versionName') {
        return [lineParts[0], `${version}`].join('=')
      }
      if (lineParts[0] === 'versionCode') {
        return [lineParts[0], parseInt(lineParts[1]) + 1].join('=')
      }
      return line
    })

  fs.writeFileSync(filePath, lines.join('\n'))
}

// updates package.json to the current version
function writePackage(version) {
  packageInfo.version = version
  fs.writeFileSync(__dirname + '/' + packagePath, JSON.stringify(packageInfo, null, 2))
}

// @flow

/**
 * Writes config.env.js which extras all TTN_* env variables into an export
 */

let fs = require('fs')
let CONFIG_ENV = __dirname + '/../config.env.js'

fs.writeFileSync(
  CONFIG_ENV,
  `// @flow\n\nexport default ${JSON.stringify({ TTN_CLIENT_ID: process.env.TTN_CLIENT_ID || '', TTN_CLIENT_SECRET: process.env.TTN_CLIENT_SECRET || '' }, null, 2).replace(/"/g, "'")}`
)

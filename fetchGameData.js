const getData = (url, port, path) => {
    var https = require('node:https')
    var tls = require('node:tls')
    var fs = require('node:fs')
    var process = require('node:process')
    const rootCas = require('ssl-root-cas').create();
    require('https').globalAgent.options.ca = rootCas;
    rootCas.addFile("riotgames.pem")
    var lolApiPath = (`https://${url}:${port}${path}`)
    var data
    console.log(lolApiPath)
    https.get(lolApiPath, (res) => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)
      res.on('data', (d) => {
        data = process.stdout.write(d)
        return d;
      })
    })
    return d;
}

module.exports = { getData }
value.exports = { data }
const getData = (url, port, path) => {
    var https = require('node:https')
    const rootCas = require('ssl-root-cas').create();
    var fetchedData
    require('https').globalAgent.options.ca = rootCas;
    rootCas.addFile("riotgames.pem")
    var lolApiPath = (`https://${url}:${port}${path}`)
    var fetchedData
    console.log(lolApiPath)
    https.get(lolApiPath, (res) => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)
      res.on('data', (fetchedData) => {
        process.stdout.write(fetchedData)
        return fetchedData;
      })
    })
    return fetchedData
}

module.exports = { getData }
exports.fetchedData = this.fetchedData

const express = require('express')
const undici = require('undici')
const fetchGameData = require('./fetchGameData.js')
const app = express()
const port = 3000
//const url = '127.0.0.1'
//const urlPort = 2999
const agent = new undici.Agent({
    connect: {
      rejectUnauthorized: false
    }
  })
undici.setGlobalDispatcher(agent)
const path = '/liveclientdata/allgamedata'
const rootCas = require('ssl-root-cas').create();
process.env.URL="https://127.0.0.1:2999"
require('https').globalAgent.options.ca = rootCas;
rootCas.addFile("riotgames.pem")

app.get('/', (req, res) => {
    var fetchedData = fetchGameData.getData(path)
    console.log(typeof(fetchedData))
    console.log("a")
    res.send(fetchedData)
})
app.listen(port, () => {
    console.log(`port ${port}`)
})
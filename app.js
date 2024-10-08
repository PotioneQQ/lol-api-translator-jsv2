const express = require('express')
const fetchGameData = require('./fetchGameData.js')
const app = express()
const port = 3000
const url = 'localhost'
const urlPort = 2999
const path = '/liveclientdata/allgamedata'
const rootCas = require('ssl-root-cas').create();
require('https').globalAgent.options.ca = rootCas;
rootCas.addFile("riotgames.pem")

var data = fetchGameData.getData(url, urlPort, path)
var fetchedData = fetchGameData.fetchedData

app.get('/', (req, res) => {
    console.log(data)
    console.log("a")
    res.send(data)
})
app.listen(port, () => {
    console.log(`port ${port}`)
})
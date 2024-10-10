//WAZNE
//liga (dzieki bogu) wyrzuca dane w kolejnosci graczy w tabeli
//czyli: 1 gracz w tabeli w grze (tab) ma w liscie index 0
//
//(nie sprawdzalem jeszcze na spectatorze, ale jezeli gracze beda w kolejnosci to nie powinno byc problemu)

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

app.get('/deadPlayers', (req, res) => {
  fetchGameData.getData(path).then((fetchedData) => {
    console.log(fetchedData.allPlayers[0].isDead);
    if (fetchedData.allPlayers[9] == undefined)
      console.log("mniej niz 10")
    else
      var json = {
        "isDead0":fetchedData.allPlayers[0].isDead,
        "isDead1":fetchedData.allPlayers[1].isDead,
        "isDead2":fetchedData.allPlayers[2].isDead,
        "isDead3":fetchedData.allPlayers[3].isDead,
        "isDead4":fetchedData.allPlayers[4].isDead,
        "isDead5":fetchedData.allPlayers[5].isDead,
        "isDead6":fetchedData.allPlayers[6].isDead,
        "isDead7":fetchedData.allPlayers[7].isDead,
        "isDead8":fetchedData.allPlayers[8].isDead,
        "isDead9":fetchedData.allPlayers[9].isDead
      }
    res.send(json);
});
})
app.listen(port, () => {
    console.log(`port ${port}`)
})
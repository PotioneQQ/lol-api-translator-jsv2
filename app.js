//WAZNE
//liga (dzieki bogu) wyrzuca dane w kolejnosci graczy w tabeli
//czyli: 1 gracz w tabeli w grze (tab) ma w liscie index 0
//
//(nie sprawdzalem jeszcze na spectatorze, ale jezeli gracze beda w kolejnosci to nie powinno byc problemu)
//
//
//TODO: send data for drakes/heralds/czerwie pustki killed from last 5 seconds as an t/f endpoint. Possibly multikills as well; stop app from crashing when league is not open (connection resets)

const express = require('express')
const undici = require('undici')
const fetchGameData = require('./fetchGameData.js')
const app = express()
const port = 3000
const agent = new undici.Agent({
    connect: {
      rejectUnauthorized: false
    }
  })
undici.setGlobalDispatcher(agent)
const path = '/liveclientdata/allgamedata'
const rootCas = require('ssl-root-cas').create();
process.env.GAMEURL="https://127.0.0.1:2999"
require('https').globalAgent.options.ca = rootCas;
rootCas.addFile("riotgames.pem")

app.get('/dead', (req, res) => {  //returns death status for each player
  fetchGameData.getData(path).then((fetchedData) => {
    console.log("fetched death status");
    var playerList = fetchedData.allPlayers
    var array = playerList
    var deadList = []
      array.forEach( element => {
        dead = {
          "isDead":element.isDead,
          "respawnTimer":element.respawnTimer
        }
        deadList.push(dead)
      })
    res.send(deadList);
});
})

app.get('/names', (req, res) => {  //returns champion names for each player
  fetchGameData.getData(path).then((fetchedData) => {
    console.log("fetched champion names");
    var playerList = fetchedData.allPlayers
    var array = playerList
    var championList = []
      array.forEach( element => {
        name = {
          "championName":element.championName,
          "playerName":element.riotIdGameName
        }
        championList.push(name)
      })
    res.send(championList);
});
})

app.get('/skins', (req, res) => {  //returns champion names and skins for each player
  fetchGameData.getData(path).then((fetchedData) => {
    console.log("fetched champion skins ");
    var playerList = fetchedData.allPlayers
    var array = playerList
    var skinList = []
    array.forEach(element => {
      skin = {
        "championName":element.championName,
        "skinId":element.skinID
      }
      skinList.push(skin)
    })
    res.send(skinList);
});
})

app.get('/runes', (req, res) => {  //returns champion runes for each player
  fetchGameData.getData(path).then((fetchedData) => {
    console.log("fetched champion runes");
    var playerList = fetchedData.allPlayers
    var array = playerList
    var runeList = []
    array.forEach(element => {
      rune = {
        "championName":element.championName,
        "keystone":element.runes.keystone.id,
        "secondary":element.runes.secondaryRuneTree.id
      }
      runeList.push(rune)
    })
    res.send(runeList);
});
})

app.get('/items', (req, res) => {  //returns champion runes for each player
  fetchGameData.getData(path).then((fetchedData) => {
    console.log("fetched champion items");
    var playerList = fetchedData.allPlayers
    var array = playerList
    var itemList = []
    array.forEach(element => {
      var itemArray = element.items
      var name = element.championName
      itemArray.forEach(element => {
        item = {
          "championName":name,
          "itemId":element.itemID,
          "count":element.count,
          "slot":element.slot
        }
        itemList.push(item)        
      })
    })
    res.send(itemList);
    });
});

app.get('/scores', (req, res) => {  //returns champion runes for each player
  fetchGameData.getData(path).then((fetchedData) => {
    console.log("fetched player scores");
    var playerList = fetchedData.allPlayers
    var array = playerList
    var scoreList = []
    array.forEach(element => {
      score = {
        "championName":element.championName,
        "level":element.level,
        "assists":element.scores.assists,
        "creepScore":element.scores.creepScore,
        "deaths":element.scores.deaths,
        "kills":element.scores.kills,
        "wardScore":element.scores.wardScore,
      }
      scoreList.push(score)
    })
    res.send(scoreList);
});
})

app.listen(port, () => {
    console.log(`port ${port}`)
})

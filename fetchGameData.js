async function getData(path) {
  const rootCas = require('ssl-root-cas').create();
  require('https').globalAgent.options.ca = rootCas;
  rootCas.addFile("riotgames.pem")
  var lolApiPath = (process.env.GAMEURL + path)
  try {
    const response = await fetch(lolApiPath)
    if (!response.ok){
      throw new Error(`Response status :${response.status}`)
    }
    const json = await response.json()
    return json
    } catch (error) {
      console.error(error.message);
  }
}
module.exports = { getData }
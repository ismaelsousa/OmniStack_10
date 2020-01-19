const axios = require('axios')
const Dev = require('../models/Dev')
const ParseStringArrays = require('../utils/ParseStringArray')
const { findConnections, sendMessage} = require('../websocket')
module.exports ={

  async index(request, response){
    const devs = await Dev.find()
    return response.json(devs)
  },
  async store(request, response){
    try {
      const {github_username, techs, latitude, longitude} = request.body

      let dev = await Dev.findOne({github_username})

      if(!dev){
        const response_api = await axios.get(`https://api.github.com/users/${github_username}`)
        const {name=login, avatar_url, bio } =  response_api.data
        const techsArray = ParseStringArrays(techs)
        const location = {
          type:'Point',
          coordinates:[longitude, latitude]
        }
        dev = await Dev.create({
          github_username,
          name,
          bio,
          avatar_url,
          techs:techsArray,
          location
        })

        /**
         * Filtrar as conexões que estão há no máximo 10000 de distância
         * O novo dev tenha uma tech filtrada
         */
        
        const sendSocketMessageTo = findConnections(
          {latitude, longitude},
          techsArray
        )
        sendMessage(sendSocketMessageTo, 'new-dev', dev)
      }

      
      return response.json(dev)
    } catch (error) {
      return response.json({"erro":error.message})
    }
    
  }
}

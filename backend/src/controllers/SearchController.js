const Dev = require('../models/Dev')

const ParseStringArrays = require('../utils/ParseStringArray')

module.exports = {
  async index(request, response ){
    // Buscar todos devs num raio de 10km
    // Filtrar por tech
    const {latitude, longitude, techs} =request.query
    const techsArray = ParseStringArrays(techs)

    const devs = await Dev.find({
      techs:{
        $in: techsArray
      },
      location:{
        $near:{
          $geometry:{
            type:'Point',
            coordinates:[longitude, latitude]
          },
          $maxDistance: 100000,
        }
      }
    })
    return response.json({devs})

  }
}
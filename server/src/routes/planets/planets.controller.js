const {getAllPlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, resp){
    return resp.status(200).json( await getAllPlanets());
}

module.exports={
    httpGetAllPlanets,
};
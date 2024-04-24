const fs = require('fs');
const path = require('path');

const {parse} = require('csv-parse');

// const results = [];

const planets = require('./planets.mongo');

function ishabitable(planet){
    return (planet['koi_disposition'] === 'CONFIRMED'
        &&  planet['koi_insol'] >= 0.36 && planet['koi_insol'] <= 1.11
        && planet['koi_prad'] <= 1.6);
}

function load_planet_data(){
    return new Promise((resolve, reject)=>{ 

        fs.createReadStream(path.join(__dirname,"..", "..",'data',`kepler_data.csv`))
        .pipe(parse({
            comment : '#',
            columns : true,
        }))
        .on('data',async (data) => {
            if(ishabitable(data)){
                // TODO
                savePlanet(data);
                
            }
                // await planets.create({
                //     kepler_name : data.kepler_name
                // });
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
    .   on('end', async ()=> { 
        console.log("Done");
        const planet_count = (await getAllPlanets()).length;
        console.log(`${planet_count} habitable planets found`);
        }); 
        resolve();
    });
}

async function getAllPlanets(){
    return await planets.find({}, {
        '__v' : 0,
        '_id' : 0,
    });
}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            kepler_name : planet.kepler_name
        }, {
            kepler_name : planet.kepler_name
        }, {
            upsert : true,
        })
    }
    catch(err){
        console.log(`Could not savew planet ${err}`);
    }
}

module.exports = {
    load_planet_data,
    getAllPlanets,
}

// parse();
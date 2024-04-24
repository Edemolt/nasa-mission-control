const launches = require('./launches.mongo');   
const axios = require('axios');
const planets = require('./planets.mongo');
// const launches = new Map();

const DEFAULT_FLIGHT_NO = 100;

let latestFlightNo = 100;

const launch = {
    flightNumber : 100,                         // flight_number
    mission : 'kepler-exploration-x',          // name
    rocket : 'Explorer IS1',                   // rocket.name
    launchDate : new Date('February 4, 2023'), // date_local
    target : 'Kepler-1652 b',                  // not applicable
    customers : ['Kushagra','Sharma'],         // payload.customers for each payload
    upcoming : true,                           // upcoming
    sucess : true,                             // success
};

save_launches(launch)

const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query';


async function populate_launches(){
    console.log('Downloading launcg data');
    const response = await axios.post(SPACEX_API_URL, {
        query : {},
        options : {
            pagination : false,
            populate : [
                {
                    path : 'rocket',
                    select : {
                        name : 1
                    }
                },
                {
                    path : 'payloads',
                    select : {
                        'customers' : 1
                    }
                }
            ]
        }
    });

    if(response.status !== 200){
        console.log(`Some kind of problem here`);
        throw new Error(`Launch data download failed`);
    }

    const launch_docs = response.data.docs;

    for(const launch_doc of launch_docs){

        const payloads = launch_doc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber : launch_doc['flight_number'],
            mission : launch_doc['name'],
            rocket : launch_doc['rocket']['name'],
            launchDate : launch_doc['date_local'],
            upcoming : launch_doc['upcoming'],
            success : launch_doc['success'],
            customers,

        }

        console.log(`${launch.flightNumber} && ${launch.mission}`)

        await save_launches(launch);
    }
    //populate launches collection
}

async function load_launch_data(){

    const first_launch = await find_launch({
        flightNumber : 1,
        rocket : "Falcon 1",
        mission : "FalconSat",
    });

    if(first_launch){
        console.log("Already loaded");
        return 
    }
    else{
        await populate_launches();
    }

    
}

async function find_launch(filter){
    return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId){
    return await find_launch({
        flightNumber : launchId,
    });
}

async function getLatestFlightNumber(){
    const latest_launch = await launches.findOne().sort('-flightNumber')

    if(!(latest_launch))
        return DEFAULT_FLIGHT_NO;
    return latest_launch.flightNumber;
}

async function getAllLaunches(skip, limit){
    return await launches
    .find({}, {'_id' : 0, '__v' : 0}).sort({flightNumber : 1})
    .skip(skip)
    .limit(limit);
}

async function save_launches(launch){

    await launches.findOneAndUpdate({
        flightNumber : launch.flightNumber,
    }, launch, {
        upsert : true,
    })
}

// function addNewLaunch(launch){
//     latestFlightNo++;
//     launches.set(latestFlightNo, Object.assign(launch, {
//         flightNumber : latestFlightNo,
//         upcoming : true,
//         sucess : true,
//         // flight_no : latestFlightNo,
//         customers: ['Zero to Mastery', 'NASA'],
        
//     }));
// }

async function schedule_new_launch(launch){

    const planet = await planets.findOne({
        kepler_name : launch.target,
    });

    if(!(planet)){
        throw new Error('No matching planet found');
    }

    const new_flight_number = await getLatestFlightNumber() + 1;
    const new_launch = Object.assign(launch , {
        sucess : true,
        upcoming : true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber : new_flight_number,
    })
    await save_launches(new_launch);

}
// launches.set(launch.flightNumber, launch);

async function abortLaunchById(launch_id){ 
    // const aborted = launches.get(launch_id);
    // aborted.upcoming = false;
    // aborted.sucess = false;
    // return aborted;

    const aborted =  await launches.updateOne({
        flightNumber : launch_id,
    }, {
        upcoming : false,
        sucess : false,
    })
    return aborted;
    return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
    load_launch_data,
    existsLaunchWithId,
    getAllLaunches,
    // addNewLaunch,
    schedule_new_launch,
    abortLaunchById,
};
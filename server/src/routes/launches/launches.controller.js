const {getAllLaunches, schedule_new_launch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model');

const get_pagination = require('../../services/query');


async function httpGetAllLaunches(req,resp){
    const x = getAllLaunches();
    console.log(`Hell0 -> ${x}`);

    // console.log(`query value --> ${req.query}`); 

    const {skip, limit} = req.query;

    const launches = await getAllLaunches(skip,limit);

    return resp.status(200).json(await launches);
}

async function httpAddNewLaunch(req, resp){
    const launch = req.body;
    if(!launch.mission || !launch.rocket   || !launch.launchDate|| !launch.target)
    return resp.status(400).json({
        error : 'Missing required attributes',
    })
    
    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate)){
        return resp.status(400).json({
            error: 'Invalid date have u entered',
        })
    }

    // alert(launch);
    await schedule_new_launch(launch)
    return resp.status(201).json(launch);
}

async function httpAbortLaunch(req, resp){
    const launch_id = Number(req.params.id);

    const exist_launch = await existsLaunchWithId(launch_id);

    if(!(exist_launch)){ 
        return resp.status(404).json({
            error : "Not found",
        })
    }
    const aborted = await abortLaunchById(launch_id);
    if(!aborted)
        return resp.status(400).json("error u have made");
    return resp.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch, 
    httpAbortLaunch
};
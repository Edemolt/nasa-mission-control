const http = require('http');
const app = require('./app');

require('dotenv').config();

const {load_planet_data} = require('./models/planets.model')
const {mongo_connect} = require('./services/mongo'); 
const {load_launch_data} = require('./models/launches.model');

const PORT = process.env.PORT || 8000;



const server = http.createServer(app);

async function startServer(){
    await mongo_connect();
    await load_planet_data();
    await load_launch_data();

    
    server.listen(PORT, '0.0.0.0', ()=>{
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();
const mongoose = require('mongoose');


const MONGO_URL = 'mongodb+srv://nasa-api:RsXvyoUqhRKPxwHa@nasacluster.fhdcoae.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('Mongodb connextion working');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongo_connect(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser : true, 
        useUnifiedTopology : true,
    });
}

async function mongo_disconnet(){
    await mongoose.disconnect();
}

module.exports = {
    mongo_connect,
    mongo_disconnet,
}
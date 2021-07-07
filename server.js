require('dotenv').config()
const mongoose = require( 'mongoose' );
const api = require( './routes/index' );
const app = require( './config/app' );

app.use('/', api);

mongoose.connect( process.env.MONGODB_URL , (err,res) => {
    if (err) {
        return console.log( `Database conection failed, Error: ${err}` );
    }
    console.log(`Database conection stablished on ${process.env.MONGODB_URL}`);
})

app.listen( process.env.PORT , () => {
    console.log(`API REST running on port ${process.env.PORT}`);
});
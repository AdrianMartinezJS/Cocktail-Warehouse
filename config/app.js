const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const multer = require('multer');
const forms = multer();
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use( bodyParser.urlencoded({extended: false}) );
app.use( bodyParser.json() );
// app.use(forms.array()); 

app.use('/public', express.static(`${__dirname}/storage/imgs`))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../storage/imgs')
      },
    // destination: this.path.join(__dirname, '../storage/imgs'),
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
      }
});
app.use(multer({storage}).single('picture'))

module.exports = app
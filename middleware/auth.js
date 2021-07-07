const services = require( '../services' )

/**
 * Middleware um zu Kontrollieren ob User authentifiziert ist
 * @param {String} req 
 * @param {String} res 
 * @param {Function} next 
 */
const isAuth = function( req , res , next ) {
    if( !req.headers.authorization ) {
        return res.status( 403 ).send( { message: ` You don't have authorization` } )
    }
    
    const header = req.headers.authorization.split(".")[ 0 ]
    const payload = req.headers.authorization.split(".")[ 1 ]
    const token = header + payload
    console.log('estas aqui en auth')

    services.decodeToken( token )
        .then( response => {
            console.log(response)
            req.username = response
            next()
        } )
        
}

module.exports = isAuth
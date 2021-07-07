const jwt = require( 'jwt-simple' )

/**
 * Kreiert einen Token mit JWT
 * @param {String} user 
 */
const createToken = function( user ) {

    const payload = {
        sub: user._id,
        username: user.username
    }
    return jwt.encode( payload , process.env.SECRET_TOKEN )
}

/**
 * Dekodiert den Token mit JWT
 * @param {String} token 
 */
const decodeToken = function( token ) {
    const decoded = new Promise( (resolve , reject) => {
        try{
            const payload = jwt.decode( token , process.env.SECRET_TOKEN )
            resolve( payload.sub )
        } catch( err ) {
            console.log(err)
            reject( {
                status: 500,
                message: `Invalid token`
            } )
        }
    } )
    
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}
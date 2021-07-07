const express = require( 'express' );
const productCtrl = require( '../controllers/product' );
const userCtrl = require( '../controllers/user' )
// const auth = require( '../middleware/auth' )
const api = express.Router();

/**
 * Route um alle Produkte zu bekommen
 */

api.get( '/product/:userId' , productCtrl.getProducts );
// api.get( '/product' , productCtrl.getProducts );

/**
 * Route um einen spezifischen Produkt von einen User zu bekommen
 */
api.get( '/product/:username/:productId' , productCtrl.getProduct );

/**
 * Route um einen neuen Produkt zu speichern
 */
api.post( '/product' , productCtrl.saveProduct );
//upload.single('image')
/**
 * Route um einen bestehenden Produkt zu aktuallisieren
 */
api.put( '/product/:productId' , /* auth ,*/ productCtrl.updateProduct ); 

/**
 * Route um einen bestehenden Produkt zu löschen
 */
api.delete( '/product/:productId' , productCtrl.deleteProduct ); 

/**
 * Route um einen neuen User zu registrieren
 */
api.post( '/signup' , userCtrl.signUp );

/**
 * Route um sich einzuloggen
 */
api.post( '/signin' , userCtrl.signIn );

/**
 * Route um einen User zu finden
 */
api.post( '/user' , userCtrl.getUser );

module.exports = api;
const mongoose = require('mongoose')
const User = require('../model/user')
const service = require('../services')
const bcrypt = require('bcryptjs')

/**
 * Saves a neu User in MongoDB if there doesn't exist another User with the same name
 * @param {String} req 
 * @param {String} res 
 */
const signUp = function (req, res) {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        User.findOne({ username: req.body.username }, (err, data) => {
            if (err) return res.status(500).send({ message: `Error with the Database: ${err}` })
            if (data) return res.status(403).send({ message: `Username already exist in the Database` })
            if (!data) {
                user.save((err) => {
                    if (err) res.status(500).send({ message: `Error creating new User: ${err}` }) // HIER CRASH !!!
                    if(!err) res.status(200).send({ message: `User saved correctly`, userId: user._id, username: user.username, token: service.createToken(user) })
                })
            }
        })
}


/**
 * Log in a User if it exists in MongoDB and the given Password and Name are the same as the saved Data 
 * @param {String} req 
 * @param {String} res 
 */
const signIn = function (req, res) {

    User.findOne({ username: req.body.username }).then(async (user) => {
        if (!user) res.status(404).send({ message: `User doesn't exist` })

        const passwordValidation = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValidation) res.status(403).send({ message: `Invalid Password` })
        if (passwordValidation) {
            res.status(200).json({
                message: `Loged in correctly`,
                userId: user._id,
                username: user.username,
                token: service.createToken(user)
            })
        }
    }).catch(err => { console.log(err) })
}

/**
 * Gets a User if it does exist in MongoDB (It gets username and userId back)
 * @param {String} req 
 * @param {String} res 
 */
const getUser = function (req, res) {
    User.findOne({ username: req.body.username }).then( (user) => {
        if (!user) res.status(404).send({ message: `User doesn't exist` })
        res.status(200).json({
            message: `User found`,
            username: user.username,
            userId: user._id,
        })
    }).catch(err => { console.log(err) })
}

module.exports = {
    signUp,
    signIn,
    getUser
}

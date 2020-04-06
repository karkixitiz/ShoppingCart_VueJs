var mongoose = require('mongoose')
const UserModel = require('../models/user')


exports.create_a_user = (req, res)=> {
    const user = new UserModel() // create a new instance of the User model

    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.fullName = req.body.firstName + " " + req.body.lastName
    user.password = req.body.password
    user.email = req.body.email
    user.isAdmin = false
    user.createdOn = new Date().toLocaleString()

    // save the bear and check for errors
    user.save(user, (err, user) => {
        if (err) {
            res.send(err)
        }
        console.log('**********NEWLY CREATED SITEURL***********')
        res.send(user)
    })
}
const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const userController= require('../controllers/UserController')

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works')
})

/*
  API for User Schema
  User Create and Read all Policies API's
*/
router.route('/users')
.post(userController.create_a_user);

    // Get All Users
    router.route('/users')
    .get((req, res) => {
        UserModel.find((err, data) => {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })

/*  USER Update and Read by Id and delete users API's */
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function (req, res) {
        UserModel.findById(req.params.user_id, function (err, data) {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function (req, res) {
        // use our user model to find the user we want
        UserModel.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err)
            }

            user.name = req.body.name
            user.password = req.body.password
            user.email = req.body.email
            user.isAdmin = false
            user.user_avatar = req.body.user_avatar
            user.phoneNumber = req.body.phoneNumber
            user.createdOn = req.body.createdOn

            // save the bear
            user.save(function (err, data) {
                if (err) {
                    res.send(err)
                }
                res.send(data)
            })

        })
    })

module.exports = router
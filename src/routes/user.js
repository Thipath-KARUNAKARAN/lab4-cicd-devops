const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

/**
 * @typedef User
 * @property {string} username.required - Identifiant unique - eg: sergkudinov
 * @property {string} firstname - Prénom - eg: Sergei
 * @property {string} lastname - Nom - eg: Kudinov
 */

/**
 * Créer un utilisateur
 * @route POST /user
 * @group User - Gestion des utilisateurs
 * @param {User.model} user.body.required - Utilisateur à créer
 * @returns {object} 201 - Utilisateur créé
 * @returns {Error} 400 - Paramètres incorrects
 */

/**
 * Récupérer un utilisateur par son username
 * @route GET /user/{username}
 * @group User - Gestion des utilisateurs
 * @param {string} username.path.required - Username de l'utilisateur
 * @returns {object} 200 - Utilisateur trouvé
 * @returns {Error} 404 - Utilisateur inexistant
 */

userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  .get('/:username', (req, resp) => {
    const username = req.params.username
    userController.get(username, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(404).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
  })

module.exports = userRouter
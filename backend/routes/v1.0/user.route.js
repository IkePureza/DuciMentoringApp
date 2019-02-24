import middleware from '../../middleware/JWTmiddleware';
import express from 'express';
const router = express.Router();

// Todo: import controlller handler from different file
//import c from '../util/controllerHandler';
import * as userController from '../../controllers/user.controller';
// Doesnt work with ES6 export
const controllerHandler = require('../../util/controllerHandler');
// Name shortener 
const c = controllerHandler;

router.get('/:firstName', c(userController.findOne, (req, res, next) => [req.params.firstName]));

router.post('/add', c(userController.create, (req, res, next) => [req]));

router.get('/', c(userController.findAll, null));

router.post('/update', c(userController.update, (req, res, next) => [req.body]));

router.post('/delete', c(userController.findAndDelete, (req, res, next) => [req.body.id]));

module.exports = router;


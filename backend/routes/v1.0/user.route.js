import middleware from '../../middleware/JWTmiddleware';
import express from 'express';
const router = express.Router();

// Todo: import controlller handler from different file
import * as userController from '../../controllers/user.controller';
import controllerHandler from '../../util/controllerHandler';

router.get('/:firstName', controllerHandler(userController.findOne, (req, res, next) => [req.params.firstName]));

router.post('/add', controllerHandler(userController.create, (req, res, next) => [req]));

router.get('/', controllerHandler(userController.findAll, null));

router.post('/update', controllerHandler(userController.update, (req, res, next) => [req.body]));

router.post('/delete', controllerHandler(userController.findAndDelete, (req, res, next) => [req.body.id]));

module.exports = router;


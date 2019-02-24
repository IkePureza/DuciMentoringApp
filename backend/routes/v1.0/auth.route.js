let middleware = require('../../middleware/JWTmiddleware');
const express = require('express');
const router = express.Router();

import * as authController from '../../controllers/auth.controller';

const controllerHandler = require('../../util/controllerHandler');
const c = controllerHandler;

router.post('/login', c(authController.login, (req, res, next) => [req])); 

router.post('/forgot-password', c(authController.forgotPassword, (req, res, next) => [req])); 

router.post('/reset-password', c(authController.resetPassword, (req, res, next) => [req])); 

router.post('/logout', c(authController.logout, (req, res, next) => [req])); 

/* Todo
  Refresh token 
  forgot Password
  Reset Password
  Update Password
  Logout
*/


module.exports = router;
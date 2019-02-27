let middleware = require('../../middleware/JWTmiddleware');
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

import * as authController from '../../controllers/auth.controller';

// const controllerHandler = require('../../util/controllerHandler');
import controllerHandler from '../../util/controllerHandler';

router.post('/login', controllerHandler(authController.login, (req, res, next) => [req])); 

router.post('/forgot-password', controllerHandler(authController.forgotPassword, (req, res, next) => [req])); 

router.post('/reset-password', controllerHandler(authController.resetPassword, (req, res, next) => [req])); 

router.post('/logout', controllerHandler(authController.logout, (req, res, next) => [req])); 

/* Todo
  Refresh token 
  forgot Password
  Reset Password
  Update Password
  Logout
*/


module.exports = router;
let jwt = require('jsonwebtoken');
const SECRET = 'theworldisfullofsecrets';

import AuthController from '../controllers/auth.controller';
import SessionModel from '../models/sessions.model';

export function generateJWT(req, user){
  const payload = {
      userId: user.id,
  };


  return jwt.sign(payload, SECRET);
};

export async function validate(req){
  const token = returnToken(req);

  if (!token) {
      return Promise.reject(new DuciError(errorTypes.unauthorised.missingToken));
  }

  const session = await SessionModel.duciFindOne(req, {token: token}, {},
      {path: 'user', select: ' -password '});

  if (!session) {
      return Promise.reject(new DuciError(errorTypes.unauthorised.invalidToken));
  }

  let dateNow = new Date();
  let dateExpiry = new Date(session.expiry);

  if (dateExpiry <= dateNow) {
      await AuthController.logout(req);
      return Promise.reject(new DuciError(errorTypes.unauthorised.invalidToken));
  }

  try {
      jwt.verify(token, SECRET);
      // If we have no errors, return the partial user from our session query above
      return session.user;
  } catch (e) {
      // log user out if the dateExpiry check passed but token check failed
      await AuthController.logout(req);
      return Promise.reject(new DuciError(errorTypes.unauthorised.invalidToken, null, e));
  }
}
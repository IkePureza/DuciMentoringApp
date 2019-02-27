// Does not work with ES6
// const UserModel = require('../models/user.model');
import UserModel from '../models/user.model';
import SessionModel from '../models/sessions.model'
import SessionArchiveModel from '../models/sessionArchive.model'
import PasswordResetTokenModel from '../models/passwordResetToken.model';
import * as jwtHelper from '../util/jwtHelper';
import Moment from 'moment';
import DuciError from '../util/api/duciError';
//const DuciError = require('../util/api/duciError');
import ERROR_TYPES from '../util/constants/errorTypes';
let errorTypes = ERROR_TYPES;


export async function login(req){    

    const {email, password, remember, source, browser, device, osVersion, isMobile, isTablet, isDesktop} = req.body;

    const user = await UserModel.duciFindOne(req, {email}, '_id email +password');
    console.log(errorTypes);

    if (!user) return  Promise.reject(new DuciError(errorTypes.notFound, "This email was"));
    
    const result = await user.comparePassword(password);

    if (result.err || !result.isMatch) {
        return Promise.reject(new DuciError(errorTypes.unauthorised.wrongCredentials));
    }

    const token = jwtHelper.generateJWT(req, user, remember ? '7 days' : '2 hours');

    let expiry = new Moment();
    if (remember) expiry.add(7, 'days');
    else expiry.add(2, 'hours');
    
    await SessionModel.duciCreate(req, {
        user: user,
        token,
        expiry,
        createdAt: new Moment(), 
        remember,
        source,
        browser,
        device,
        userAgent: req.get('User-Agent'),
        ipAddress: req.connection.remoteAddress,
        osVersion,
        isMobile,
        isTablet,
        isDesktop,
    });
    
    return Promise.resolve({token, user});;
}

export async function forgotPassword(req){
    const {email, answer} = req.body;
    const user = await UserModel.duciFindOne(req, {email}, '_id email +backgroundAnswer');
    if (!user) return  Promise.reject("sorry there are no accounts under this email");

    const result = await user.compareAnswer(answer);

    if (result.err || !result.isMatch) {
        return Promise.reject("wrong credidantials");
    }

    const token = jwtHelper.generateJWT(req, user);

    const link = 'localhost:4000/api/v1.0/auth/reset-password/?key=' + token;

    const newPasswordResetToken = await PasswordResetTokenModel.duciCreate(req, {
        user: user.id,
        token,
    });
    console.log(newPasswordResetToken);
    
    if (!newPasswordResetToken) return Promise.reject("Failed to genereate token");
    
    // Todo Duci Mail: reset password through the mail
    console.log(link);
    return Promise.resolve({newPasswordResetToken, link});

}

export async function resetPassword(req){
    const {token, newPassword} = req.body;
    console.log("token here:  " + token);
        
    let tokenDocument = await PasswordResetTokenModel.duciFindOne(req, {token});

    console.log("1");
    

    if (!tokenDocument) {
        return Promise.reject("invalid token");
    }
    console.log("3");
    
    // Todo: token expiry
    const userId = tokenDocument.user;
    console.log(userId);

    console.log("4");
    
    let user = await UserModel.duciFindById(req, userId, '+password');

    if (!user) {
        return Promise.reject("User not found");
    }

    user.password = newPassword;
    console.log("4.5");
    await UserModel.duciSave(req, user);

    console.log("5");

    return await PasswordResetTokenModel.findByIdAndRemove(tokenDocument.id, (err, user) => {if(err) return null});

}

export async function logout(req){

    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : undefined;
    if (!token) return Promise.reject("missing jwt token");

    let session = await SessionModel.duciFindOne(req, {token: token}, 'user');
    if (!session) {
        return Promise.reject("invalid session token");
    }
    console.log(session.createdAt);
    
    // Create a new session archive
    await SessionArchiveModel.duciCreate(req, {
        user: session.user,
        sessionStart: session.createdAt,
        sessionEnd: new Moment(),
        remember: session.remember,
        source: session.source,
        browser: session.browser,
        device: session.device,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        osVersion: session.osVersion,
        isMobile: session.isMobile,
        isTablet: session.isTablet,
        isDesktop: session.isDesktop,
    });

    return await SessionModel.findByIdAndRemove(session.id, (err, user) => {if(err) return null});

}

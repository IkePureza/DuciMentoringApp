import UserModel from '../models/user.model';
import DuciError from '../util/api/duciError';
import ERROR_TYPES from '../util/constants/errorTypes';
const errorTypes = ERROR_TYPES ;

export async function findOne(firstName) {
    const user = await UserModel.find({firstName}).exec();
    return user;
}

export async function create(req) {
    const user = await UserModel.duciFindOne(req , {"email": req.body.email});
    if (user) return  Promise.reject(new DuciError(errorTypes.badRequest.unknown, "This Email is already in use"));
    
    let data = req.body;
    let newUser = await UserModel.duciCreate(req, data);
    return newUser;
}

export async function findAll() {
    const users = await UserModel.find().exec();
    return users;
}

// Todo: Fix this controller
export async function update(req) {  
    const userId = req.id; 
    console.log(req.id);
    // TODP: do this async way
    let user =  User.duciFindById(req, userId);

    if (!user){
        return Promise.reject(new DuciError(errorTypes.notFound, 'User'));
    }else {

        const user = await UserModel.duciFindOne(req, {"email": req.email}); //implement await
        if (user) return  Promise.reject(new DuciError(errorTypes.badRequest.unknown, "This Email is already in use"));
        if(req.firstName) user.firstName = req.firstName;
        if(req.lastName) user.lastName = req.lastName;
        if(req.email) user.email = req.email;
        await user.save() // implement await
        
        return user;  
    }
}

export async function findAndDelete(userId) {
    let success = await UserModel.findOneAndDelete({_id: userId}, (err, user) => {
    })
    // TODO: More friendly error message when delete fails
    return success;
}
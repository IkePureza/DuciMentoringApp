import UserModel from '../models/user.model';

export async function findOne(firstName) {
    const user = await UserModel.find({firstName}).exec();
    return user;
}

export async function create(req) {

    const user = await UserModel.findOne({"email": req.body.email}, (err, user) => {if(err) return null});
    if (user) return  Promise.reject("Email already in use");
    
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
    let user =  User.findById(userId, (err, user) => {
        if (!user){
            console.log("failed " + userId);
            return next(new Error('Could not load document'));
        }else {

            const user = UserModel.findOne({"email": req.email}, (err, user) => {if(err) return null}); //implement await
            if (user) return  Promise.reject("Email already in use");

            if(req.firstName) user.firstName = req.firstName;
            if(req.lastName) user.lastName = req.lastName;
            if(req.email) user.email = req.email;
            

            console.log("Updated User: " + user)

            user.save() // implement await
            
            return user;  
        }
    });
    // Todo return updated user instead of OK.
    console.log("returning" + user)
    return user;
}

export async function findAndDelete(userId) {
    let success = await UserModel.findOneAndDelete({_id: userId}, (err, user) => {
    })
    // TODO: More friendly error message when delete fails
    return success;
}
import mongoose from 'mongoose';
const dbModelFactory = require('../db/factories/dbModelFactory');
const schemaName = 'PasswordResetToken';
// const userModelName = require('./user.model').modelName;


let model = dbModelFactory.generate(schemaName, {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
    //Todo expiry
});

export default model;
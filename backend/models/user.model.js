import mongoose from 'mongoose';
import bcrypt from'bcrypt';
const dbModelFactory = require('../db/factories/dbModelFactory');
const schemaName = "User";

let model = dbModelFactory.generate(schemaName, {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    mentors: {
        type: String
    },
    chosenBackgroundQuestion:{
        type: String
    },
    backgroundAnswer: {
        type: String,
        select: false
    }
}, function (schema) {
    schema.pre('save', function(next) {
        const user = this;
        if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
        } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
            console.log('Error hashing password for user', user.name);
            next(err);
            } else {
            user.password = hash;
            next();
            }
        });
        bcrypt.hash(user.backgroundAnswer, 10, function(err, hash) {
            if (err) {
            console.log('Error hashing background password for user', user.name);
            next(err);
            } else {
            user.backgroundAnswer = hash;
            next();
            }
        });
        }
    });

    schema.methods.comparePassword = async function (candidatePassword) {
        // Copy password as bcrypt.compare modifies the password
        let password = this.password.slice(0);

        return await new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, password, function (err, isMatch) {
                if (err) resolve({err});

                return resolve({isMatch, err});
            });
        });
    };
    schema.methods.compareAnswer = async function (candidateAnswer) {
        // Copy password as bcrypt.compare modifies the password
        let answer = this.backgroundAnswer.slice(0);

        return await new Promise((resolve, reject) => {
            bcrypt.compare(candidateAnswer, answer, function (err, isMatch) {
                if (err) resolve({err});

                return resolve({isMatch, err});
            });
        });
    };
});

export default model;

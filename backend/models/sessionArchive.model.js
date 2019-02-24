import mongoose from 'mongoose';
const dbModelFactory = require('../db/factories/dbModelFactory');
import sourceTypes from '../util/constants/sources';
const schemaName = "ArchivedSession"

let model = dbModelFactory.generate(schemaName, {

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Might be the wrong implementation of require('./user.model').modelName;
        required: true,
    },
    sessionStart: {
        type: Date,
    },
    sessionEnd: {
        type: Date,
    },
    remember: {
        type: Boolean,
        required: true,
        default: false,
    },
    ipAddress: {
        type: String,
    },
    usersAgent: {
        type: String,
    },
    source: {
        type: String,
        enum: sourceTypes,
    },
    browser: {
        type: String,
    },
    os: {
        type: String,
    },
    device: {
        type: String,
    },
    osVersion: {
        type: String,
    },
    isMobile: {
        type: Boolean,
    },
    isTablet: {
        type: Boolean,
    },
    isDesktop: {
        type: Boolean,
    },
});

export default model;

import mongoose from 'mongoose';
import sourceTypes from '../util/constants/sources';
// Doesnt work with ES6: import import dbModelFactory from'../db/factories/dbModelFactory';
const dbModelFactory = require('../db/factories/dbModelFactory');

const schemaName = "Sessions"

let model = dbModelFactory.generate(schemaName, {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        require: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    remember: {
        type: Boolean,
        required: true,
        default: false,
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
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

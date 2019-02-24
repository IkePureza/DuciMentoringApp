import queryPlugin from '../plugins/dbQueryPlugin';
import mongoose from 'mongoose';

export function generate(modelName, schema, customFunction){
    let options = {};

    // posibility for history fields and other plugins

    let modelSchema = mongoose.Schema(schema, options);

    modelSchema.plugin(queryPlugin);
    
    if (customFunction !== undefined) {
        customFunction(modelSchema);
    }

    return mongoose.model(modelName, modelSchema);
}
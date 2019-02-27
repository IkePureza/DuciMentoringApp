import Moment from 'moment';
import duciError from '../../util/api/duciError';
import errorTypes from '../../util/constants/errorTypes';

export default function ( schema, optionsItem){

    schema.statics.duciCreate = async function (req, document) {
        // Todo: history fields: const data = await addHistoryFields(req, document, false);
        let data = document;
        const doc = new this(data);
        try {
            return await doc.save();
        } catch (e) {
            return Promise.reject("Bad Request: " + e);
        }
    };

    schema.statics.duciFindOne = async function (req, query = {}, selection = null) {
        // Todo: fields to populate
        let document;

        try {
            document = await this.findOne(query, selection);
        } catch (e) {
            return Promise.reject(new duciError(errorTypes.notFound, this.modelName));
        }

        return document;
    };

    schema.statics.duciFindById = async function (req, id, selection = null, options = {}, fieldsToPopulate = []) {
        // Todo: fields to populate
        let document;

        try {
            document = await this.findById(id, selection, options);
        } catch (e) {
            return Promise.reject(e);
        }

        return document;
    };

    schema.statics.duciSave = async function (req, doc) {
        if (doc.constructor.name !== 'model') {
            return Promise.reject('Invalid document');
        }
        try{
            let savedDocument = await doc.save();
            return savedDocument;
        } catch (e){
            return Promise.reject(e);

        }
    }
}
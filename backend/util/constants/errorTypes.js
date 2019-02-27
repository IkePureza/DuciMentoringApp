const ERROR_TYPES = {
    badRequest: {
        unknown: 'badRequest',
        missingField: 'missingField',
        incorrectValue: 'incorrectValue',
        cannotBeDeleted: 'cannotBeDeleted',
    },
    unauthorised: {
        wrongCredentials: 'wrongCredentials',
        invalidToken: 'invalidToken',
        missingToken: 'missingToken',
    },
    forbidden: {
        forbidden: 'forbidden',
        noClearance: 'noClearance',
        noWritePrivilege: 'noWritePrivilege',
    },
    notFound: 'notFound',
    internalServerError: 'internalServerError',
};

export default ERROR_TYPES;
export const ERROR_TYPES = {
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
    notFound: 'notFound',
    internalServerError: 'internalServerError',
};
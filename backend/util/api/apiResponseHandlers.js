const setNoCacheHeaders = (res) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
};

const registerResponseHandlers = function (express) {
    const errorCodes = {
        badRequest: {
            unknown: 0,
            missingField: 1,
            incorrectValue: 2,
            cannotBeDeleted: 3,
        },
        unauthorised: {
            wrongCredentials: 1,
            invalidToken: 2,
            missingToken: 3,
        },
        forbidden: {
            forbidden: 1,
            noClearance: 2,
            noWritePrivilege: 3,
        },
        notFound: 1,
        internalServerError: 0,
    };

    express.response.ok = function (json) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(200);
        this.json(json);
    };

    express.response.created = function (json) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(201);
        this.json(json);
    };

    express.response.noContent = function () {
        setNoCacheHeaders(this);
        this.status(204);
        this.send();
    };


    express.response.resetContent = function () {
        setNoCacheHeaders(this);
        this.status(205);
        this.send();
    };

    express.response.badRequest = function (errorMessage) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.unknown,
            errorMessage: errorMessage || 'Bad Request',
        });
    };

    express.response.missingField = function (fieldName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.missingField,
            errorMessage: `Missing field: ${fieldName}`,
        });
    };

    express.response.cannotBeDeleted = function (resourceName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.cannotBeDeleted,
            errorMessage: `${resourceName} cannot be deleted because it is used by another resource`,
        });
    };

    express.response.incorrectValue = function (fieldName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(400);
        this.json({
            errorCode: errorCodes.badRequest.incorrectValue,
            errorMessage: `Incorrect value for ${fieldName}`,
        });
    };

    express.response.wrongCredentials = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(401);
        this.json({
            errorCode: errorCodes.unauthorised.wrongCredentials,
            errorMessage: 'Wrong credentials',
        });
    };

    express.response.invalidToken = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(401);
        this.json({
            errorCode: errorCodes.unauthorised.invalidToken,
            errorMessage: 'Invalid token',
        });
    };

    express.response.missingToken = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(401);
        this.json({
            errorCode: errorCodes.unauthorised.missingToken,
            errorMessage: 'Missing token',
        });
    };

    express.response.forbidden = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(403);
        this.json({
            errorCode: errorCodes.forbidden.forbidden,
            errorMessage: 'Forbidden',
        });
    };

    express.response.noClearance = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(403);
        this.json({
            errorCode: errorCodes.forbidden.noClearance,
            errorMessage: 'You do not have clearance for this action',
        });
    };

    express.response.noWritePrivilege = function () {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(403);
        this.json({
            errorCode: errorCodes.forbidden.noWritePrivilege,
            errorMessage: 'You do not have write privileges',
        });
    };

    express.response.notFound = function (resourceName) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(404);
        this.json({
            errorCode: errorCodes.notFound,
            errorMessage: `${resourceName} not found`,
        });
    };

    express.response.internalServerError = function (errorMessage) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'application/json; charset=utf-8');
        this.status(500);
        this.json({
            errorCode: errorCodes.internalServerError,
            errorMessage: errorMessage,
        });
    };

    express.response.handleError = function (error) {
        setNoCacheHeaders(this);

        const {errorType, errorContent} = error;

        console.error(error);

        if (errorType && this[errorType] && typeof this[errorType] === 'function') {
            this[errorType](errorContent);
        } else {
            this.internalServerError(errorContent);
        }
    };

    express.response.sendPlainText = function (text) {
        setNoCacheHeaders(this);
        this.header('Content-Type', 'text/plain; charset=utf-8');
        this.status(200);
        this.send(text);
    };
};

export default registerResponseHandlers;
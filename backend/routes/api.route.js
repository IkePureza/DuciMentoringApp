const express = require('express');
const router = express.Router();

const v1Router = require('./v1.0/_index.route');
router.use('/v1.0', v1Router);

// to add a new API version, simply duplicate the latest version's folder, and duplicate the lines above

module.exports = router;
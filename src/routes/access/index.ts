import express from 'express';
const router = express.Router();
const AccessController = require('../../controllers/Access.Controller');
const { checkApiKey, checkPermissios } = require('../../auth/checkAuth');
const { asyncHandler } = require('../../auth/checkAuth');
// check api key
router.use(checkApiKey);

// check permissions
// (req chứa apikey có permissions = ['0000']) -> được đi qua
router.use(checkPermissios('0000'));

// [GET] /v1/shop/signup
router.post('/signup', asyncHandler(AccessController.signUp));
router.post('/login', asyncHandler(AccessController.login));

module.exports = router;

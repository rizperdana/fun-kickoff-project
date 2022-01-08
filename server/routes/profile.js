const express = require('express');
const router = express.Router();
const validateObject = require('../utils/validateObject');

const {
    fetchProfiles,
    createProfile,
    getProfile,
    updateProfile
} = require('../controllers/profile');
const { validateProfile } = require('../validate');
const protect = require('../middleware/auth');

router
    .route('/')
    .get(fetchProfiles)
    .post([protect, validateProfile], createProfile);

router
    .route('/:id')
    .get(validateObject.id, getProfile)
    .put([protect, validateObject.id], updateProfile);

module.exports = router;
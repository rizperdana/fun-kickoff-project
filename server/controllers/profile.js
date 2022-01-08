const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');

// Main Controllers

// @desc Fetch all profiles
// @route GET /profiles
// @access Public
exports.fetchProfiles = asyncHandler(async(req, res, next) => {
    const profiles = await Profile.find();
    res
        .status(200)
        .json({
            success: true,
            data: profiles
        });
});

// @desc Create new user profile
// @route POST /profiles
// @access Public
exports.createProfile = asyncHandler(async(req, res, next) => {
    const {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        description,
        availability,
        address,
        photo
    } = req.body;

    const profileRequest = await Profile.create({
        userId: req.user.id,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        description,
        availability,
        address,
        photo
    }).save();

    res
        .status(201)
        .json({
            success: true,
            data: profileRequest
        });
});

// Specific Controllers

// @desc Get profile by id
// @route GET /profiles/:id
// @access Public
exports.getProfile = asyncHandler(async(req, res, next) => {
    const profileData = await Profile.findById(req.params.id);
    if (!profileData) {
        res.status(404);
        throw new Error(`Cannot found profile with id = ${req.params.id}`);
    }
    res
        .status(200)
        .json({
            success: true,
            data: profileData
        });
});

// @desc Update profiles
// @route PUT /profiles/:id
// @access Private
exports.updateProfile = asyncHandler(async(req, res, next) => {
    let profileData = await Profile.findById(req.params.id);
    if (!profileData) {
        res.status(404);
        throw new Error(`Cannot find profile with id ${req.params.id}`);
    }

    if (profileData.userId !== req.user.id) {
        res.status(401);
        throw new Error(`Insufficient authorization to update this profile`);
    }

    profileData = await Profile.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        });

    res
        .status(200)
        .json({
            success: true,
            data: profileData
        })
});
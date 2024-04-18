const Country = require('../models/country-model');
const User = require('../models/user-model');
const Post = require('../models/post-model');
const mongoose = require("mongoose");
const delete_files = require('../utils/delete-files');

const add_country = (async(req ,res ,next) => {
    try{
        const { country } = req.body;
        const userId = req.user._id;
        const photo = req.file;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const user = await User.findById(userId);
        if (!user) {
            const error = 'User not found';
            return next(error);
        }
        const existing_country = await Country.findOne({country: country, postedBy: userId });
        if(existing_country){
            const error = 'Duplicate country';
            return next(error);
        }
        const newCountry = new Country({
            postedBy: userId,
            country: country,
            photo: req.file ? photo.filename : ''
        });
        await newCountry.save();
        res.status(201).json({status: 'SUCCESS', data: {user: userId, country:country, photo: photo}});

    }catch(error){
        next(error);
    }
});

const get_all_countries = (async(req ,res ,next) => {
    try {
        const { userId } = req.params;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const user = await User.findById(userId);
        if (!user) {
            const error = 'User not found';
            return next(error);
        }
        const countries = await Country.find({ postedBy: userId });
        res.status(200).json({ status: 'SUCCESS', data: countries });
    } catch (error) {
        next(error);
    }
});

const edit_country = (async(req ,res ,next) => {
    try{
        const { userId, countryId } = req.params;
        const { country } = req.body;
        const country_photo = req.file;

        let updateData = {};

        const oldCountry = await Country.findById(countryId);
        if (country === 'undefined'){
            updateData.country = oldCountry.country;
        }else{
            updateData.country = country;
        } 
        if (country_photo) {
            // Delete old countryPhoto file if a new one is uploaded
            if (oldCountry.countryPhoto) {
                await delete_files([oldCountry.countryPhoto]);
            }
            updateData.countryPhoto = country_photo.filename;
        }

        const updated_country = await Country.findByIdAndUpdate(countryId, updateData, { new: true });
        if (!updated_country) {
            const error = 'User not found';
            return next(error);
        }

        res.status(200).json({ status: 'SUCCESS', data: updated_country });
    }catch(error){
        next(error);
    }
});

const delete_country = (async(req ,res ,next) => {
    console.log("delete")
    try{
        const {userId, countryId} = req.params;
        await Post.deleteMany({ postedBy: userId, country: countryId });
        await Country.deleteOne({ _id: countryId, postedBy: userId });
        res.status(200).json({ status: 'SUCCESS', message: 'Country deleted successfully' });
    }catch(error){
        next(error);
    }
});

module.exports = {
    add_country,
    get_all_countries,
    edit_country,
    delete_country
};
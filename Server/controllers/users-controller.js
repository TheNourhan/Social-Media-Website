const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const Country = require('../models/country-model');
const Post = require('../models/post-model');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {create_access_token, create_refresh_token} = require('../middlewares/genrate-token');

const register = (async (req ,res ,next) => {
    const {firstName, lastName, username, email, password} = req.body;
    if(firstName && lastName && username && email && password){
        const oldUser = await User.findOne({ 
           $or:[
               {username: username},
               {email: email}
           ]
        });
        if(oldUser){
            const error = 'user already exists';
            return next(error);
        }
        //user not found
        const hashedPassword = await bcrypt.hash(password, 10);
        const new_user = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        });
        await new_user.save();
        res.status(201).json({status: 'Register Successful', data: {user: new_user}}); 

    }else{
        const error_message ="make sure each field has a valid value.";
        res.status(200).json({error_message: error_message});
    }   
 });
 
const login = (async(req ,res ,next) => {
    const {logUsername, logPassword} = req.body;
    if(!logUsername || !logPassword){
        const error = 'Email and Password are required';
        return next(error);
    }
    const user = await User.findOne({ 
        $or:[
            { username: logUsername},
            { email:  logUsername}
        ]
    });
    if(!user){
        const error = 'This user does not exists';
        return next(error);
    }
    const matched_password = await bcrypt.compare(logPassword, user.password);
    if(!matched_password) {
        return res.status(400).json({msg: "Password is Incorrect"});
    }
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    };
    const access_token = create_access_token(payload);
    const refresh_token = create_refresh_token(payload);
    res.cookie('refreshtoken', refresh_token, {
        httpOnly:true,
        path:'/refresh_token',
        maxAge : 30*24*60*60*1000 //30
    });
    return res.status(200).json({ status: 'Login successful', data: {access_token: access_token, user: user}});
});

const refresh_token = (async(req, res)=>{
    try {
        const refresh_token = req.cookies.refreshtoken;
        if(!refresh_token){
            return res.status(400).json({msg:"Please login now"})
        }
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async(err, result)=>{
            if(err){
                return res.status(400).json({msg:"Please login now"});
            }
            const user = await User.findById(result.id);
            if (!user) {
                console.log("user")
                return res.status(400).json({ msg: "This user does not exist" });
            }
            const populatedUser = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.following
            };
            const access_token = create_access_token({id:result.id})
            res.json({access_token: access_token, user: populatedUser});
        });
    
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
});

const logout = (async(req, res, next)=>{
    try {
        res.clearCookie('refreshtoken', { path: '/refresh_token' })
        return res.json({ msg: "Logout Successfully" })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
});

const get_profile = (async(req, res, next) => {
    try{
        const userId = req.params.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const user = await User.findById(userId);
        if(!user){
            const error = 'User not found';
            return next(error);
        }
        const data = {
            name: user.firstName + " " +user.lastName,
            handle: user.username,
            photo: user.profilePic,
            followers: user.followers.length,
            following: user.following.length,
            bio: user.bio
        }
        res.status(200).json({ status: 'SUCCESS', data: data });
    }catch(error){
        next(error);
    }
});

const edit_profile = (async(req, res, next) => {
    try{
        const userId = req.params.userId;
        const { firstName, lastName, profilePic, bio } = req.body;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const updated_user = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            profilePic,
            bio
        }, { new: true });
        if(!updated_user){
            const error = 'User not found';
            return next(error);
        }
        res.status(200).json({ status: 'SUCCESS', data: updated_user });
    }catch(error){
        next(error);
    }
});

const delete_profile = (async(req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        await Post.deleteMany({ postedBy: userId });
        await Country.deleteMany({ postedBy: userId });
        const deleted_user = await User.findByIdAndDelete(userId);
        if (!deleted_user) {
            const error = 'User not found';
            return next(error);
        }
        res.status(200).json({ status: 'SUCCESS', message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
});

const follow = (async(req, res, next) => {
    try {
        const { followerId, followeeId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followeeId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const follower = await User.findById(followerId);
        const followee = await User.findById(followeeId);
        if (!follower || !followee) {
            const error = 'Follower or followee not found';
            return next(error);
        }
        if (follower.following.includes(followeeId) || followee.followers.includes(followerId)) {
            const error = 'Follow relationship already exists';
            return next(error);
        }
        follower.following.push(followeeId);
        followee.followers.push(followerId);
        await Promise.all([follower.save(), followee.save()]);
        res.status(200).json({ status: 'SUCCESS', message: 'Follow relationship added successfully' });
    } catch (error) {
        next(error);
    }
});

const unfollow = (async(req, res, next) => {
    try {
        const { followerId, followeeId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followeeId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const follower = await User.findById(followerId);
        const followee = await User.findById(followeeId);
        if (!follower || !followee) {
            const error = 'Follower or followee not found';
            return next(error);
        }
        if (!follower.following.includes(followeeId) || !followee.followers.includes(followerId)) {
            const error = 'Follow relationship does not exist';
            return next(error);
        }
        // Remove followeeId from follower's following list and followerId from followee's followers list
        follower.following = follower.following.filter(id => id.toString() !== followeeId.toString());
        followee.followers = followee.followers.filter(id => id.toString() !== followerId.toString());

        await Promise.all([follower.save(), followee.save()]);

        res.status(200).json({ status: 'SUCCESS', message: 'Unfollowed successfully' });
    } catch (error) {
        next(error);
    }
});

const get_following = (async(req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const user = await User.findById(userId);
        if (!user) {
            const error = 'User not found';
            return next(error);
        }
        const following = await User.find({ _id: { $in: user.following } }, '_id firstName lastName profilePic username');

        res.status(200).json({ status: 'SUCCESS', data: following });
    } catch (error) {
        next(error);
    }
});

const get_followers = (async(req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const user = await User.findById(userId);
        if (!user) {
            const error = 'User not found';
            return next(error);
        }
        const followers = await User.find({ _id: { $in: user.followers } }, '_id firstName lastName profilePic username');

        res.status(200).json({ status: 'SUCCESS', data: followers });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    register,
    login,
    refresh_token,
    logout,
    get_profile,
    edit_profile,
    delete_profile,
    follow,
    unfollow,
    get_following,
    get_followers
};
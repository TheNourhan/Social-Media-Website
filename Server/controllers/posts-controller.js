const User = require('../models/user-model');
const Post = require('../models/post-model');
const Country = require('../models/country-model');
const Notification = require('../models/notification-model');
const mongoose = require("mongoose");

const send_post = (async(req ,res ,next) => {
    try{
        const {userId} = req.params;
        const postPhoto = req.file?.filename;
        const { country, title, post } = req.body;
        if(!post){
            const error = 'Content param not sent with request!';
            return next(error);
        }
        const user = await User.findById(userId);
        if(!user){
            const error = 'User not found';
            return next(error);
        }
        let countryId;
        let saved_country;
        const existing_country = await Country.find({ postedBy: userId, country: country });
        if (existing_country.length > 0) {
            countryId = existing_country[0]._id;
        }else{
            const new_country = new Country({
                postedBy: user._id,
                country: country,
            });
            saved_country = await new_country.save();
            countryId = saved_country._id;
        }
        const new_post = new Post({
            postedBy: user._id,
            country: countryId,
            title: title,
            content: post,
            postPhoto: postPhoto ? postPhoto : '',
        });
        await new_post.save();
        const data = {
            postedBy: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.profilePic,
            country: country ? country : saved_country.country,
            title: title, 
            content: post, 
            postPhoto: postPhoto ? postPhoto : '',
        }
        res.status(201).json({status: 'SUCCESS', data: data});
    }catch(error){
        next(error);
    }
});

const get_all_posts =  (async (req, res, next) => {
    try{
        const {userId, countryId} = req.params;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const posts = await Post.find({ postedBy: userId, country: countryId });
        const posts_data = [];
        for (const post of posts) {
            const user = await User.findById(post.postedBy);
            const country = await Country.findById(post.country);
            const post_data = {
                postId: post._id,
                handle: user.username,
                username: user.firstName + " " +  user.lastName,
                avatar: user.avatar,
                countryId: country._id,
                country: country.country,
                title: post.title,
                content: post.content,
                postPhoto: post.postPhoto ? post.postPhoto : '',
                createdAt: post.createdAt,
                likes: post.likes,
                comment: post.comments,
            };
            posts_data.push(post_data);
        }
        res.status(200).json({ status: 'SUCCESS', data: posts_data });        
    } catch (error) {
        next(error);
    }
});

const get_post = (async (req, res, next) => {
    try {
        const {userId, countryId, postId} = req.params;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        const post = await Post.findOne({ _id: postId, postedBy: userId, country: countryId });
        if (!post) {
            const error = 'Post not found';
            return next(error);
        }
        const user = await User.findById(userId);
        const post_data = {
            handle: user.username,
            username: user.firstName + " " +  user.lastName,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            likes: post.likes,
            Comment: post.comments,
        };
        res.status(200).json({ status: 'SUCCESS', data: post_data });
    } catch (error) {
        next(error);
    }
});

const delete_post = (async(req ,res ,next) => {
    try{
        const {userId, countryId, postId} = req.params;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            const error = 'Invalid user ID';
            return next(error);
        }
        await Post.deleteOne({ _id: postId, postedBy: userId, country:countryId });
        res.status(200).json({ status: 'SUCCESS', message: 'Post deleted successfully' });
    }catch(error){
        next(error);
    }
});

const toggle_like = (async(req ,res ,next) => {
    try {
        const { userId, countryId, postId } = req.params;
        const current_user = req.user._id;
        const post = await Post.findOne({ _id: postId  });
        if (!post) {
            throw new Error('Post not found');
        }
        const already_liked = post.likes.indexOf(current_user);
        if (already_liked !== -1 ) {
            post.likes.splice(already_liked, 1);

            // Remove the corresponding notification
            await Notification.findOneAndDelete({
                recipient: post.postedBy,
                sender: current_user,
                type: 'like',
                postTitle: post.title
            });
        } else {
            post.likes.push(current_user);

            if(post.postedBy != current_user){
                const notification = new Notification({
                    recipient: post.postedBy, // User who authored the post
                    sender: current_user,     // User who liked the post
                    type: 'like',
                    postTitle: post.title
                });
                await notification.save();
            }  
        }
        await post.save();
        res.status(201).json({status: 'SUCCESS', data: post.likes});
    } catch (error) {
        throw new Error(`Error toggling like: ${error.message}`);
    }
});

const timeline = (async(req ,res ,next) => {
    try {
        const currentUser = req.user;
        const followingIds = currentUser.following.map(user => user._id);

        const timeline_posts = await Post.find({ postedBy: { $in: followingIds } })
                                        .populate('postedBy', 'firstName lastName username avatar')
                                        .populate('country', 'country')
                                        .sort({ createdAt: -1 });
        const formattedPosts = timeline_posts.map(post => ({
            postId: post._id, 
            handle: post.postedBy?.username || null, 
            userId: post.postedBy?._id,
            username: `${post.postedBy?.firstName || ''} ${post.postedBy?.lastName || ''}`, 
            avatar: post.postedBy?.avatar || null, 
            country: post.country?.country || null,
            title: post.title, 
            content: post.content, 
            likes: post.likes, 
            postPhoto: post.postPhoto || null
        }));
        console.log("timeline", formattedPosts)

        res.status(201).json({status: 'SUCCESS', data: formattedPosts});
    } catch (error) {
        next(error);
    }
});

module.exports = {
    send_post,
    get_all_posts,
    get_post,
    delete_post,
    toggle_like,
    timeline
};
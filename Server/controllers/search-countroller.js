const User = require('../models/user-model');
const Post = require('../models/post-model');
const Country = require('../models/country-model');

const search_all = (async (req ,res, next) => {
    try {
        const { query } = req.body;
        let results = [];
        let type;

        const users_results = await search_users(query);
        if(users_results !== undefined && Object.keys(users_results).length !== 0){
            results.push(...users_results);
            type = 'users';
        }

        const posts_results = await search_posts(query);  
        if(posts_results !== undefined && Object.keys(posts_results).length !== 0){
            results.push(...posts_results);
            if (!type) type = 'posts';
        }
/*
        const countries_results = await search_countries(query);
        if(countries_results !== undefined && Object.keys(countries_results).length !== 0){
            results.push(...countries_results);
            if (!type) type = 'posts';
        }
*/
        res.status(200).json({ status: 'SUCCESS', type: type, data: results });
    } catch (error) {
        next(next);
    }
});

const search_users = async (query) => {
    try{
        const user_pattern = new RegExp("^" + query, "i");
        const users = await User.find({
            $or: [
                { firstName: { $regex: user_pattern } },
                { lastName: { $regex: user_pattern } },
                { username: { $regex: user_pattern } },
            ]
        }).select("_id firstName lastName username avatar bio");
        console.log("users",users);
    
        return users;
    }catch(error){
        console.error(error);
    }
}

const search_posts = async (query) => {
    try{
        const post_pattern = new RegExp("\\b" + query + "\\b", "i");
        const posts = await Post.find({
            $or: [
                { title: { $regex: post_pattern } },
                { content: { $regex: post_pattern } }
            ]
        }).populate('postedBy', 'firstName lastName username avatar').populate('country', 'country countryPhoto');
  
        const formattedPosts = posts.map(post => ({
            _id: post._id,
            title: post.title,
            content: post.content,
            country: post.country?.country || null,
            likes: post.likes.length,
            handel: post.postedBy?.username || null,
            userId: post.postedBy?._id || null,
            name: `${post.postedBy?.firstName || ''} ${post.postedBy?.lastName || ''}`,
            avatar: post.postedBy?.avatar || null,
            photo: post.photo || null
        }));

        return formattedPosts;
    }catch(error){
        console.error(error);
    }
}

const search_countries = async (query) => {
    try {
        const country_pattern = new RegExp("\\b" + query + "\\b", "i");
        const country = await Country.findOne({country: country_pattern});
        console.log("country", country)
        if (!country) {
            console.log("Country not found")
        }else{
            // Find posts that are associated with the found country
            const posts = await Post.find({ country: country._id });
            console.log("posts",posts);
            return posts;
        }
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    search_all
}

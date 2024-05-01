const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;
const CountrySchema = new Schema({
    postedBy:{
        type: ObjectId,
        ref: "User",
    },
    country:{
        type: String,
        required: true,
    },
    countryPhoto:{
        type: String,
        default: 'default/trekkers.jpg'
    },
},{ timestamps:true});

const Country = mongoose.model('Country', CountrySchema);

module.exports = Country;
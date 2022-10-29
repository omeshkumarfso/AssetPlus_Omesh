var mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
    {
        // @AssetPlus: Describe schema here
        photo:{
            data:Buffer,
            contentType:String
        },
        title:{
            type:String
        },
        description: {
            type: String,
            trim: true
        },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("PostModel", postSchema)
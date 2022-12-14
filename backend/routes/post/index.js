const PostModel = require("../../models/Post");
const formidable = require('formidable')
var router = require("express").Router();
var fs = require('fs')
const savePost = require("../../controllers/post");
// @AssetPlus: This is a sample get request
router.get("/", async (req, res) => {
    var posts = await PostModel.find();
    return res.send(posts);
});

router.delete("/delete", async (req, res) => {
    
    await PostModel.findByIdAndRemove(req.body._id);
    var posts = await PostModel.find();
    return res.send(posts);
});

// @AssetPlus: Add other routes here
// router.post("/add")
router.post("/add", async  (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtentions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            logger.info(err)
            return res.status(400).json({
                error: "problem with image"
            });
        }

        const {title, description} = fields

        let postData = new PostModel(fields);
        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                logger.info("File size too big!")
                return res.status(400).json({
                    error: "File size too big!"
                });
            }
            postData.photo.data = fs.readFileSync(file.photo.filepath);
            postData.photo.contentType = file.photo.mimetype;
        }

        postData.save((err, postData) => {
            if (err) {
                logger.info(err)
                res.status(400).json({
                    error: "Saving profile details failed"
                });
            }
            res.status(200).json(postData)
        })

    })
});
module.exports = router;
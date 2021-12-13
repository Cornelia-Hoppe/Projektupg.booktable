const express = require("express");
const router = express.Router();
const Post = require("./models/Post");

module.exports = router;

   router.post("/newpost", (req, res) => {
    console.log(req.body);
    const newPost = new Post({
        firstname: req.body.firstname,  
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        additionalinfo: req.body.additionalinfo,
    });
  
  
    newPost.save((err) => {
    if (err) {
        console.log(err);
        res.status(500).json({
            message: {
                msgBody: "Woops! Error occured while saving booking.",
                msgError: true, // msgBody and msgError needs to be defined?
            },
        });
    } else {
       // postAddedEmail(req.body) // Needs to be defined
        res.status(201).json({
            message: { msgBody: "Your booking has been completed!", msgError: false },
        });
    }
});
});
router.get("/getposts", (req, res) => {
    Post.find({}, (err, documents) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "An error occured getting posts",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({ posts: documents });
      }
    });
  });

  router.put("/updatepost/:id", (req, res) => {
    Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.email, content: req.body.firstname },
      (err) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Your booking is not updated! An error occured.",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            message: { msgBody: "Booking updated!", msgError: false },
          });
        }
      }
    );
  });

router.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => { //trying to find id and deleting it
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Can't delete booking, an error has occured",
          msgError: "true"
        },
      });
    } else {
      res.status(200).json({
        message: { msgBody: "Booking has been removed", msgError: false },
      });
}
  });
});
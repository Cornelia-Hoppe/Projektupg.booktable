const express = require("express");
const router = express.Router();
const Post = require("./models/Post");
const { postAddedEmail } = require("./services/EmailService");

module.exports = router;

//Object newPost from app.js is sent to this endpoint
   router.post("/newpost", (req, res) => {
    console.log(req.body);
// Creating new post object from the post model and setting it´s properties to the corresponding properties from the request (req) body.
    const newPost = new Post({
        firstname: req.body.firstname,  
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        additionalinfo: req.body.additionalinfo,
    });

//Saving method from mongoose is used to save the new post to the collection, if it works it sends the else an if it fails it does the err (error).
    newPost.save((err) => {
    if (err) {
        console.log(err);
        res.status(500).json({
            message: {
                msgBody: "Woops! Error occured while saving booking.",
                msgError: true, 
            },
        });
    } else { // Before proceeding to send the request to our client we need to send the information, in this case req.body to the post data email service.
        postAddedEmail(req.body);
        res.status(201).json({
            message: { msgBody: "Your booking has been completed!", msgError: false },
        });
    }
});
   });
   
//Object getPost from app.js is sent to this endpoint.
router.get("/getposts", (req, res) => {
// document holds all posts in the post collection, and if there is a problem you will recieve an error message   
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
//Object updatePost from app.js is sent to this endpoint, the function here then uses the id that is sent with updatePost to find the right post.
  router.put("/updatepost/:id", (req, res) => {
    Post.findByIdAndUpdate(
      req.params.id,
//and then updates additionalinfo to the object that we sent in our request body, if it works it sends the else an if it fails it does the err (error).
      { additionalinfo: req.body.additionalinfo,},
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

  //Object deletePost from app.js is sent to this endpoint, the function here then uses the id that is sent with deletePost to find the right post.
router.delete("/deletepost/:id", (req, res) => {
//Trying to find id and deleting it, if it works then it deletes, if not then return error response.
  Post.findByIdAndDelete(req.params.id, (err) => { 
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

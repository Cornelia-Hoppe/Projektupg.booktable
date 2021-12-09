const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  additionalinfo: {
    type: String,
    required: true,
  }, 
});

module.exports = mongoose.model("Post", PostSchema);

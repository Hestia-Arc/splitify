const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "No Image",
  },
},
{
  timestamps: true,
});

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;

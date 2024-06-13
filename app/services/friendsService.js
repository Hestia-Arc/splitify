// const ULID = require("ulid");
const Friend = require("../models/friendModel");
const User = require("../models/userModel");
const NotFound = require("../errors/NotFound");
const { format } = require("date-fns");

// -------------------- ALL FRIENDS....
async function getFriends(owner) {
  let userFriend = await Friend.find({
    owner: owner,
  });

  if (userFriend.length === 0) {
    throw new NotFound("User has no friend yet");
    
  }
  return userFriend;
}

// -------------------- ONE FRIEND...
async function getFriend(request) {
  const result = await Friend.findOne({
    owner: request.owner,
    _id: request.id,
  });

  if (result === null) {
    throw new NotFound("Friend not found.");
  }

  return result;
}

// -------------------- CREATE FRIEND...
async function createFriend(data, identifier) {
  const newFriend = new Friend(data);

  newFriend.save();

  const result = await User.findByIdAndUpdate(
    identifier,
    { $push: { friends: newFriend._id } },
    { new: true, upsert: true }
  )
    .then((user) => {
      return user;
    })
    .catch((error) => {
      return error;
    });

  return { message: "Friend created successfully" };
}

// -------------------- UPDATE FRIEND
async function updateFriend(params, body) {
  const result = await Friend.findOne({
    owner: params.owner,
    _id: params.id,
  });

  if (result === null) {
    throw new NotFound("Friend not found.");
  }

  const friendUpdate = await Friend.updateOne(
    {
      owner: params.owner,
      _id: params.id,
    },
    {
      $set: body,
    }
  );

  return { msg: "Friend updated successfully" };
}

// -------------------- DELETE FRIEND
async function deleteFriend(params) {
  const result = await Friend.findOne({
    owner: params.owner,
    _id: params.id,
  });

  if (result === null) {
    throw new NotFound("Friend not found.");
  }

  var deleteFriend = await Friend.deleteOne({
    owner: params.owner,
    _id: params.id,
  });

  return { msg: "Friend deleted successfully" };
}

// --------------------

module.exports = {
  getFriends,
  getFriend,
  createFriend,
  updateFriend,
  deleteFriend,
};

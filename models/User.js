const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    // String, Unique, Required, Trimmed
  },
  email: {
    // String, Unique, Required, must match valid email address
  },
  thoughts: {
    // Array of _id values referencing the Thought model
  },
  friends: {
    // Array of _id values referencing the User model (self-reference)
  },
});

const User = model('User', UserSchema);

module.exports = User;
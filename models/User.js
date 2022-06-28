const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    // String, Unique, Required, Trimmed
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    // String, Unique, Required, must match valid email address
    type: String,
    unique: true,
    required: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "this must be an email address"
    ]
  },
  thoughts: [{
    // Array of _id values referencing the Thought model
    type: Schema.Types.ObjectId,
    ref: "Thought"
  }],
  friends: [{
    // Array of _id values referencing the User model (self-reference)
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
},
{
  toJSON:{
    virtuals: true
  },
  id: false
}
);

UserSchema.virtuals("friendCount").get(function(){
  return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;
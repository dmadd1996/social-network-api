const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    })

ThoughtSchema.virtuals("reactionCount").get(function () {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
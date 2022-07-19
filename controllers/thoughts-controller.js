const { User, Thought } = require('../models')

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
            .then((dbThoughtData) => {
                res.json(dbThoughtData)
            })
            .catch((error) => {
                console.log(error)
                res.status(400)
                    .json(error)
            })
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                res.json(dbThoughtData)
            })
            .catch((error) => {
                console.log(error)
                res.status(400, "No thought with this ID")
                    .json(error)
            })
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                res.json(dbThoughtData)
            })
            .catch((error) => {
                console.log(error)
                res.status(400)
                    .json(error)
            })
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction(req, res) {
        User.updateOne(
            { _id: req.params.userId },
            { $push: {reactions: { _id: req.params.reactionId}}}
            )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    removeReaction(req, res) {
        User.updateOne(
            { _id: req.params.userId },
            { $pull: {reactions: { _id: req.params.reactionId}}}
            )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController
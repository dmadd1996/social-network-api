const { User, Thought } = require('../models')

const userController = {
    getUsers(req, res) {
        User.find()
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((error) => {
                console.log(error)
                res.status(400)
                    .json(error)
            })
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((error) => {
                console.log(error)
                res.status(400, "No user with this ID")
                    .json(error)
            })
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((error) => {
                console.log(error)
                res.status(400)
                    .json(error)
            })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend(req, res) {
        User.updateOne(
            { _id: req.params.userId },
            { $push: {friends: { _id: req.params.friendId}}}
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
    removeFriend(req, res) {
        User.updateOne(
            { _id: req.params.userId },
            { $pull: {friends: { _id: req.params.friendId}}}
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

module.exports = userController
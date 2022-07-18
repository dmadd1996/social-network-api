const router = require('express').Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)
router.route('/:userId/add/:friendId').put(addFriend)
router.route('/:userId/remove/:friendId').put(removeFriend)

module.exports = router
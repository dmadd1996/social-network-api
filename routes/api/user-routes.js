const router = require('express').Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user-controller')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router
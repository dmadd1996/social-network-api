const router = require('express').Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
} = require('../../controllers/user-controller')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUserById).put(updateUser)

module.exports = router
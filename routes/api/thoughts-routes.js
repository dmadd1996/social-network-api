const router = require('express').Router()
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thought-controller')

router.route('/').get(getThoughts).post(createThought)
router.route('/:ThoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

module.exports = router
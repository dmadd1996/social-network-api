const router = require('express').Router()
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    removeReaction,
    addReaction,
} = require('../../controllers/thoughts-controller')

router.route('/').get(getThoughts).post(createThought)
router.route('/:ThoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)
router.route('/:ThoughtId/reactions').put(addReaction)
router.route('/:thoughtId/reactions/remove/:reactionId').put(removeReaction)
module.exports = router
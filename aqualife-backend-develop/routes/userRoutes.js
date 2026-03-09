const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)

router.route('/:userid').delete(verifyJWT, usersController.deleteUser)

router.route('/emailTesting').get(verifyJWT, usersController.emailTesting)

router.route('/getMemberRequests').get(verifyJWT, usersController.getAllMemberRequests)

router.route('/updateMember/:id').patch(verifyJWT, usersController.approveMember)

router.route('/getUsersForTheTasks').get(verifyJWT, usersController.getAllUsersForTasks)

router.route('/:id').get(usersController.getspecificUserDetails)

router.route('/updateSchema').patch(verifyJWT, usersController.changeSchema)

module.exports = router

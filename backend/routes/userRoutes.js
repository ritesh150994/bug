import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  // getUserProfile,
  // updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser,protect,admin).get(getUsers,protect,admin)
router.post('/login', authUser)
// router
//   .route('/profile')
  // .get(getUserProfile)
  // .put(updateUserProfile)
router
  .route('/:id')
  .delete(protect,admin,deleteUser)
  .get(protect,admin,getUserById)
  .put(protect,admin,updateUser)

export default router

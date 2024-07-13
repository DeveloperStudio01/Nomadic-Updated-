import express from 'express'
import { deleteUser, getAllUser,getSingleUser, updateUser } from '../controllers/userController.js'
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js'

const router=express.Router()
router.put("/:id",verifyUser,updateUser)//Update user
router.delete('/:id',verifyUser,deleteUser)//Delete user
router.get("/:id",verifyUser,getSingleUser)//get 1 user details
router.get('/',verifyAdmin,getAllUser)//get All users

export default router
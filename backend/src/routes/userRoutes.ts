import Router from 'express'
import { getAllUsers, loginUser, registerUser } from '../controllers/userControllers'
import { verifyToken } from '../middleware/tokenVerify'

const user_router = Router()

user_router.get('/',verifyToken,getAllUsers)
user_router.post('/register',registerUser)
user_router.post('/login',loginUser)

export default user_router
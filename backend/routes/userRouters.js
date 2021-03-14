import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc 모든 제품 가져오기
//@route GET /api/products
//@접근 public
const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
)

//@desc 특정 제품 가져오기
//@route GET /api/products/:id
//@접근 public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: '상품이 발견되지 않았습니다' })
    }
  })
)

export default router

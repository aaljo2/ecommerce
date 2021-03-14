import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc 모든 제품 가져오기
//@route GET /api/products
//@접근 public
const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

//@desc 특정 제품 가져오기
//@route GET /api/products/:id
//@접근 public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: '상품이 발견되지 않았습니다' })
    }
  })
)

export default router

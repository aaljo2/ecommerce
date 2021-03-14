import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'
//@desc 모든 제품 가져오기
//@route GET /api/products
//@접근 public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

//@desc 특정 제품 가져오기
//@route GET /api/product/:id
//@접근 public
router.get(
  ':id',
  asyncHandler(async (req, res) => {
    const product = products.find((product) => product._id === req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: '상품이 발견되지 않았어요' })
    }
  })
)

export default router

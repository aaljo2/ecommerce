import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouters from './routes/productRouters.js'
import userRouters from './routes/userRouters'

dotenv.config()
connectDB()
const app = express()

// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   next();// 다음 middleware
// })

app.get('/', (req, res) => {
  res.send('API 구동중 ...')
})
app.use('/api/products', productRouters)
app.use('/api/users', userRouters)

app.use((req, res, next) => {
  console.log('1-1) 이전 실행이 될거에욘')
  const error = new Error(`${req.originalUrl} 이 발견되지 않았어요`)
  res.status(404)
  console.log('2-1) 이전 실행이 될거에욘')
  next(error)
  console.log(`이전 app.use ${error}`)
})

app.use((err, req, res, next) => {
  console.log('에러: ', err)
  console.log(`2) app.use err ${req} 이에요`)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})
const PORT = process.env.PORT | 5000
app.listen(PORT, console.log(`환경변수 적용 서버가 ${PORT}포트에서 ${process.env.NODE_ENV} 모드로 구동중`))

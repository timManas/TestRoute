import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

// RUN THIS ONLY IN PRODUCTION MODE
if (process.env.NODE_ENV === 'production') {
  // Set the 'build' folder as a static folder
  // Why ? So we can access the build folder and load the index.html
  app.use(express.static(path.join(__dirname, '/frontend/build'))) // set frontend folder as a static folder

  // Send the index.html file if on Production
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running ....')
  })
}

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

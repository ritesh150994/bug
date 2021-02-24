import express from 'express'
// import {asyncHandler} from 'express-async-handler'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import invoiceRoutes from './routes/invoiceRoutes.js'

dotenv.config()
connectDB()

const app = express();


app.get('/', (req, res) => {
  res.send('app is running....')
})

app.use(cors())
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/api/invoices', invoiceRoutes)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
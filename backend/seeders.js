import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import invoices from './data/invoices.js'
import users from './data/users.js'
import Invoice from './models/invoiceModel.js'

import User from './models/userModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
  
    await Invoice.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    // const adminUser = createdUsers[0]._id

    // const sampleInvoices = invoices.map((product) => {
    //   return { ...product, user: adminUser }
    // })

    const sampleInvoices = await Invoice.insertMany(invoices)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
  
    await Invoice.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

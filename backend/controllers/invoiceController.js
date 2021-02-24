import asyncHandler from 'express-async-handler'
import Invoice from '../models/invoiceModel.js'
import User from '../models/userModel.js'

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const addInvoiceItems = asyncHandler(async (req, res) => {
  const {
    createdBy,
    name,
    address,
    contactNumber,
    email,
    invoiceNumber,
    invoiceDate,
    currency,
    state,
    products,
    subtotal,
    discount,
    CGST,
    SGST,
    IGST,
    totalPrice,
    pointToRemember,
    status

  } = req.body

 const user=await User.findById(req.params.id)
 console.log(user)
  
    const invoice= await Invoice.create({
    
        user,
        createdBy,
        name,
        address,
        contactNumber,
        email,
        invoiceNumber,
        invoiceDate,
        currency,
        state,
        products,
        subtotal,
        discount,
        CGST,
        SGST,
        IGST,
        totalPrice,
        pointToRemember,
        status
    })

    // const createdInvoice = await invoice.save()

    res.status(201).json({  
      user:invoice.user,
      createdBy:invoice.createdBy,
      name:invoice.name,
      address:invoice.address,
      contactNumber:invoice.contactNumber,
      email:invoice.email,
      invoiceNumber:invoice.invoiceNumber,
      invoiceDate:invoice.invoiceDate,
      currency:invoice.currency,
      state:invoice.isHaryana,
      products:invoice.products,
      subtotal:invoice.subtotal,
      discount:invoice.discount,
      CGST:invoice.CGST,
      SGST:invoice.SGST,
      IGST:invoice.IGST,
      totalPrice:invoice.totalPrice,
      status:invoice.status,
      pointToRemember:invoice.pointToRemember
    })
  // }
})

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private/Admin

const getInvoices = asyncHandler(async (req, res) => {
  const invoice = await Invoice.find({}).populate('user','name')
  res.json(invoice)
})

// @desc    Update user
// @route   PUT /api/invoices/:id
// @access  Private/Admin
const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    
    invoice.user = req.body.user || invoice.user
    invoice.createdBy = req.body.createdBy || invoice.createdBy
    invoice.name = req.body.name || invoice.name
    invoice.address = req.body.address || invoice.address
    invoice.contactNumber = req.body.contactNumber || invoice.contactNumber
    invoice.email = req.body.email || invoice.email
    invoice.invoiceNumber = req.body.invoiceNumber || invoice.invoiceNumber
    invoice.invoiceDate = req.body.invoiceDate || invoice.invoiceDate
    invoice.currency = req.body.currency || invoice.currency
    invoice.state = req.body.state || invoice.state
    invoice.products = req.body.products || invoice.products
    invoice.subtotal = req.body.subtotal || invoice.subtotal
    invoice.discount = req.body.discount || invoice.discount
    invoice.CGST = req.body.CGST || invoice.CGST
    invoice.SGST = req.body.SGST || invoice.SGST
    invoice.IGST = req.body.IGST || invoice.IGST
    invoice.totalPrice = req.body.totalPrice || invoice.totalPrice
    invoice.status = req.body.status || invoice.status
    invoice.pointToRemember = req.body.pointToRemember || invoice.pointToRemember


    const updateInvoice = await invoice.save()

    res.json({
      _id: updateInvoice._id,
      createdBy: updateInvoice.createdBy,
      name: updateInvoice.name,
      address: updateInvoice.address,
      contactNumber: updateInvoice.contactNumber,
      email: updateInvoice.email,
      invoiceNumber: updateInvoice.invoiceNumber,
      invoiceDate: updateInvoice.invoiceDate,
      currency: updateInvoice.currency,
      state: updateInvoice.state,
      products: updateInvoice.products,
      subtotal: updateInvoice.subtotal,
      discount: updateInvoice.discount,
      CGST: updateInvoice.CGST,
      SGST: updateInvoice.SGST,
      IGST: updateInvoice.IGST,
      totalPrice: updateInvoice.totalPrice,
      status: updateInvoice.status,
      pointToRemember: updateInvoice.pointToRemember,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

// @desc    Get invoice by ID
// @route   GET /api/invoices/:id
// @access  Private/Admin
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
  console.log(invoice)

  if (invoice) {
    res.json(invoice)
    throw new Error('Invoice not found')
  }
})


// @desc    Delete invoice
// @route   DELETE /api/invoice/:id
// @access  Private/Admin
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    await invoice.remove()
    res.json({ message: 'invoice removed' })
  } else {
    res.status(404)
    throw new Error('invoice not found')
  }
})

export {
    addInvoiceItems,
    updateInvoice,
    getInvoices,
    getInvoiceById,
    deleteInvoice
  }
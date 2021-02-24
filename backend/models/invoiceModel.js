import mongoose from 'mongoose'

const invoiceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    createdBy:{
  type:String,
  // required:true,
    },

    name:{
  type:String,
  required:true,
    },

    address:{
  type:String,
  required:true,
    },

    contactNumber:{
  type:Number,
  // required:true,
    },
    email:{
  type:String,
  required:true,
    },
    invoiceNumber:{
  type:String,
  required:true,
    },
    invoiceDate:{
  type:Date,
  // required:true,
    },
    currency:{
  type:String,
  required:true,
    },
    state:{
  type:String,
  // required:true,
    },
    
    products: [
      {
        name: { type: String },
        qty: { type: Number  },
        price: { type: Number  },
        amount: { type: Number  },
        
      },
    ],
 
    subtotal: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    discount: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    
    CGST: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    
    SGST: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    IGST: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    
    totalPrice: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    // status: {
    //   type: String,
    //   required: true,
      
    // },
    pointsToRemember: {
        type:String,  
    },
    
  },
  {
    timestamps: true,
  }
)

const Invoice = mongoose.model('invoice', invoiceSchema)

export default Invoice

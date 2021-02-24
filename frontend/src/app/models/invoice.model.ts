export interface Invoice{
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   // required: true,
  //   ref: 'User',
  // },

  createdBy:string,
 name:string,
  address:string,
  contactNumber:number,
  email:string,
  invoiceNumber:string,

  invoiceDate:Date,
  currency:string,
  state:string,
  
  products: [
    {
      name: string,
      qty:number,
      price:number,
      amount:number
      
    },
  ],

  subtotal: number,
  discount: number,
  CGST: number,
  
  SGST: number,
  IGST:number,
  
  totalPrice:number,
  // status:string,
  pointsToRemember?: string
  
 }
const invoices = [
    {
        createdBy:'AlmaHub',
      name: 'ritesh',
      address: 'gurgaon,haryana',
      contactNumber: 9511592512,
      email: 'ritesh@gmail.com',
      invoiceNumber: '00001/GSTA/20-21',
      invoiceDate: new Date().toISOString(),
      currency: 'INR',
      isHaryana: 'true',
      productItems: [
        {
          name: 'iphone',
          qty: 2,
          price: 10000,
          amount: 20000,
        },
      ],
      subTotal: 20000,
      discount: 1000,
      CGST: 100,
      SGST: 100,
      IGST: 0,
      totalPrice: 19200,
      status:'paid'
    },
   
  
  ]
  
  export default invoices
  
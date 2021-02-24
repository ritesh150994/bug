import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InvoiceService } from 'src/app/home/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
id:any
  data:any
  products:[]=[]

 CGST=0.00
  SGST=0.00
  IGST=0.00
  subtotal=0.00
  discount=0.00
  total=0.00
  updateForm:FormGroup
  
  constructor(private invoiceService:InvoiceService,
    private router:Router,private route:ActivatedRoute) { }
  
  
  
  
    // updateForm: FormGroup = new FormGroup({
    //   'createdBy':new FormControl(null,Validators.required),
  
    //   'name': new FormControl(null, Validators.required),
    //   'address': new FormControl(null, Validators.required),
    //   'contactNumber': new FormControl(null, Validators.required),
    //   'email': new FormControl(null, Validators.required),
    //   'invoiceNumber': new FormControl(null, Validators.required),
    //   'invoiceDate': new FormControl(null, Validators.required),
    //   'currency': new FormControl(null, Validators.required),
    //   'state': new FormControl(null, Validators.required),
    //   'subtotal':new FormControl(null,Validators.required),
    //   'discount':new FormControl(null,Validators.required),
    //   'CGST':new FormControl(null,Validators.required),
    //   'SGST':new FormControl(null,Validators.required),
    //   'IGST':new FormControl(null,Validators.required),
    //   'totalPrice':new FormControl(null,Validators.required),
    //   'products': new FormArray([])
    // })
  
  
  
    
  
    get controls() {
      return (<FormArray>this.updateForm.get('products')).controls;
    }
    addProduct() {
      (<FormArray>this.updateForm.get('products')).push(
        new FormGroup({
          'name': new FormControl(null),
          'qty': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'price': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
    }
  
    onDelete(index: number) {
      (<FormArray>this.updateForm.get('products')).removeAt(index);
    }
   
  getTotal(){
    let product=this.updateForm.value.products
   let totalPrice=product.reduce((a,b)=>a+b.price*b.qty,0)
  
   if(this.updateForm.get('currency').value==='USD'){
      this.subtotal=totalPrice
      this.total=totalPrice
   }else{
    if(this.updateForm.get('currency').value==='INR' && this.updateForm.get('state').value==='Haryana'){
       this.subtotal=totalPrice
       this.discount=totalPrice*0.05
       this.CGST=totalPrice*0.09
       this.SGST=totalPrice*0.09
       this.total=totalPrice-this.discount+this.CGST+this.SGST
    } else{
      this.subtotal=totalPrice
      this.discount=totalPrice*0.05
      this.IGST=totalPrice*0.18 
      this.total=totalPrice-this.discount+this.IGST
    }
   }
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=params['id']
        this.initForm();
      }
    )
  // this.invoiceService.getInvoiceById(this.id).subscribe(
  //   res=>{
  //     console.log(res)
  //     this.data=res
   

  //     this.updateForm.patchValue({
  //       createdBy:this.data.createdBy,
  //       name:this.data.name,
  //       address:this.data.address,
  //       contactNumber:this.data.contactNumber,
  //       email:this.data.email,
  //       invoiceNumber:this.data.invoiceNumber,
  //       invoiceDate:this.data.invoiceDate,
  //       currency:this.data.currency,
  //       state:this.data.state,
  //       subtotal:this.data.subtotal,
  //       discount:this.data.discount,
  //       CGST:this.data.CGST,
  //       IGST:this.data.IGST,
  //       SGST:this.data.SGST,
  //       totalPrice:this.data.totalPrice,
  //       products:this.data.products
        
  //     })
  //   })
  
 
  }
  
  onUpdate(id:number) {

    // console.log(this.updateForm)
    // console.log(this.updateForm.value)
  
  
  
  // const invoiceData={
  //   createdBy:this.updateForm.value.createdBy,
  //   name:this.updateForm.value.name,
  //   address:this.updateForm.value.address,
  //   contactNumber:this.updateForm.value.contact,
  //   email:this.updateForm.value.email,
  //   invoiceNumber:this.updateForm.value.invoiceNumber,
  //   invoiceDate:this.updateForm.value.invoiceDate,
  //    currency:this.updateForm.value.currency,
  //   state:this.updateForm.value.state,
    
  //   subtotal:this.subtotal,
  //   discount:this.discount,
  //   CGST:this.CGST,
  //   SGST:this.SGST,
  //   IGST:this.IGST,
  //   totalPrice:this.total,
  //   products:this.updateForm.value.products,
    
  // }
  // for(let product of invoiceData.products){
  //   product.push(
  //     new FormGroup({
  //       'name': new FormControl(product.name, Validators.required),
  //       'qty': new FormControl(product.qty, Validators.required),
  //       'price': new FormControl(product.price, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }
  //   this.invoiceService.updateInvoice(invoiceData,this.id).subscribe(res=>{
  //     console.log(res)
  //   })
    
  //   this.updateForm.reset();
  //   this.router.navigate(['/manage-invoice'],{relativeTo:this.route})
  //   this.SGST=0.00
  //   this.IGST=0.00
  //   this.CGST=0.00
  //   this.subtotal=0.00
  //   this.discount=0.00
  //   this.total=0.00
    

  this.invoiceService.updateInvoice(this.id,this.updateForm.value)
  }


  private initForm(){
    let createdBy='';
    let name = '';
    let address = '';
    let contactNumber
    let email = '';
    let invoiceNumber = '';
    let invoiceDate 
    let currency = '';
    let state='';
    let subtotal
    let discount
    let CGST
    let SGST
    let IGST
    let totalPrice
    let products = new FormArray([]);
  

  this.invoiceService.getInvoiceById(this.id).subscribe(res=>{
      let invoice=res
      
      createdBy=invoice.createdBy;
      name=invoice.name;
      address=invoice.address;
      contactNumber=invoice.contactNumber;
      email=invoice.email;
      invoiceNumber=invoice.invoiceNumber;
      invoiceDate=invoice.invoiceDate;
      currency=invoice.currency;
      state=invoice.state;
      subtotal=invoice.subtotal;
      discount=invoice.discount;
      CGST=invoice.CGST;
      SGST=invoice.SGST;
      IGST=invoice.IGST;
    totalPrice=invoice.totalPrice;

    if(invoice['products']){
    for(let product of invoice.products){
      // const product=[]
      products.push(
        new FormGroup({
          'name': new FormControl(product.name, Validators.required),
          'qty': new FormControl(product.qty, Validators.required),
          'price': new FormControl(product.price, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    }
  }
        this.updateForm = new FormGroup({
        'createdBy':new FormControl(createdBy,Validators.required),
    
        'name': new FormControl(name, Validators.required),
        'address': new FormControl(address, Validators.required),
        'contactNumber': new FormControl(contactNumber, Validators.required),
        'email': new FormControl(email, Validators.required),
        'invoiceNumber': new FormControl(invoiceNumber, Validators.required),
        'invoiceDate': new FormControl(invoiceDate, Validators.required),
        'currency': new FormControl(currency, Validators.required),
        'state': new FormControl(state, Validators.required),
        'subtotal':new FormControl(subtotal,Validators.required),
        'discount':new FormControl(discount,Validators.required),
        'CGST':new FormControl(CGST,Validators.required),
        'SGST':new FormControl(SGST,Validators.required),
        'IGST':new FormControl(IGST,Validators.required),
        'totalPrice':new FormControl(totalPrice,Validators.required),
        'products':products
        
      
      })
     
  })
}

}

  
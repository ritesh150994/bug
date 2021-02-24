import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../home/invoice.service';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
 

CGST=0.00
SGST=0.00
IGST=0.00
subtotal=0.00
discount=0.00
total=0.00


constructor(private invoiceService:InvoiceService,
  private router:Router,private route:ActivatedRoute) { }




  createForm: FormGroup = new FormGroup({
    'createdBy':new FormControl(null,Validators.required),

    'name': new FormControl(null, Validators.required),
    'address': new FormControl(null, Validators.required),
    'contactNumber': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.required),
    'invoiceNumber': new FormControl(null, Validators.required),
    'invoiceDate': new FormControl(null, Validators.required),
    'currency': new FormControl(null, Validators.required),
    'state': new FormControl(null, Validators.required),
    'subtotal':new FormControl(null,Validators.required),
    'discount':new FormControl(null,Validators.required),
    'CGST':new FormControl(null,Validators.required),
    'SGST':new FormControl(null,Validators.required),
    'IGST':new FormControl(null,Validators.required),
    'totalPrice':new FormControl(null,Validators.required),
    'products': new FormArray([])
  })



  

  get controls() {
    return (<FormArray>this.createForm.get('products')).controls;
  }
  addProduct() {
    (<FormArray>this.createForm.get('products')).push(
      new FormGroup({
        'name': new FormControl(null),
        'qty': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'price': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDelete(index: number) {
    (<FormArray>this.createForm.get('products')).removeAt(index);
  }
 
getTotal(){
  let product=this.createForm.value.products
 let totalPrice=product.reduce((a,b)=>a+b.price*b.qty,0)

 if(this.createForm.get('currency').value==='USD'){
    this.subtotal=totalPrice
    this.total=totalPrice
 }else{
  if(this.createForm.get('currency').value==='INR' && this.createForm.get('state').value==='Haryana'){
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
  
}

onSubmit() {
  
  console.log(this.createForm)
  console.log(this.createForm.value)

  let id=JSON.parse(localStorage.getItem('user'))._id
  console.log(id)

const invoiceData={
  createdBy:this.createForm.value.createdBy,
  name:this.createForm.value.name,
  address:this.createForm.value.address,
  contactNumber:this.createForm.value.contact,
  email:this.createForm.value.email,
  invoiceNumber:this.createForm.value.invoiceNumber,
  invoiceDate:this.createForm.value.invoiceDate,
   currency:this.createForm.value.currency,
  state:this.createForm.value.state,
  
  subtotal:this.subtotal,
  discount:this.discount,
  CGST:this.CGST,
  SGST:this.SGST,
  IGST:this.IGST,
  totalPrice:this.total,
   products:this.createForm.value.products
}
  this.invoiceService.createInvoice(invoiceData,id).subscribe(res=>{
    console.log(res)
  })
  
  this.createForm.reset();
  this.router.navigate(['/manage-invoice'],{relativeTo:this.route})
  this.SGST=0.00
  this.IGST=0.00
  this.CGST=0.00
  this.subtotal=0.00
  this.discount=0.00
  this.total=0.00
  
}

}

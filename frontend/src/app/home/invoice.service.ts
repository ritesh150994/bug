import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import {Invoice} from '../models/invoice.model'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
  })
export class InvoiceService{
    ROOT_URL:string = environment.BASE_URL

    constructor(private http:HttpClient,private router:Router){ }

    createInvoice(InvoiceData:object,id:number){
      
     return this.http.post(`${this.ROOT_URL}/api/invoices/${id}`,InvoiceData)
    }

    getInvoices(){
     return this.http.get<Invoice[]>(`${this.ROOT_URL}/api/Invoices`)
}


updateInvoice(InvoiceData:object,id:number){

  return this.http.put(`${this.ROOT_URL}/api/invoices/${id}`,InvoiceData)
   
}

getInvoiceById(id:string) {
  console.log(id)
  return this.http.get<Invoice>(`${this.ROOT_URL}/api/invoices/${id}`)
}


deleteId(id:number){
  return this.http.delete<Invoice>(`${this.ROOT_URL}/api/invoices/${id}`)
 }


 async generatePDF(invoice:any) {
  let docDefinition = {
    content: [
      // {
      //   text: 'ELECTRONIC SHOP',
      //   fontSize: 16,
      //   alignment: 'center',
      //   color: '#047886'
      // },
      {
        text: 'PDF Generated with Image from external URL',
        fontSize : 20
      },
      {
        image: await this.getBase64ImageFromURL(
          "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
        )
      }  , 
      
      {
        text: 'INVOICE',
        fontSize: 10,
        bold: true,
        alignment: 'center',
        decoration: 'underline',
        color: 'skyblue'
      },
      {
        text: 'Customer Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              text: `Customer Name: ${invoice.name}`,
              bold:true
            },
            { text:`Address: ${invoice.address}` },
            { text: `Contact no.: ${invoice.contactNumber}` },
            { text: `Email: ${invoice.email}` },
          ],
          [
            {
              text: `Date: ${new Date().toLocaleString()}`,
              alignment: 'right'
            },
            { 
              text: `Invoice No. : ${((Math.random() *1000).toFixed(0))}/bigstep/2020-21`,
              alignment: 'right'
            }
          ]
        ]
      },
      {
        text: 'Order Details',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Product', 'Price', 'Quantity', 'Amount'],
            ...invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
            [{text: 'Subtotal', colSpan: 3}, {}, {}, invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)],
            [{text: 'Discount', colSpan: 3},{}, {},invoice.discount.toFixed(2)],
            [{text: 'Tax', colSpan: 3},{}, {},(invoice.CGST+invoice.SGST+invoice.IGST).toFixed(2)],
            [{text: 'TotalAmount', colSpan: 3},{}, {},(invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0)+invoice.discount-(invoice.CGST+invoice.SGST+invoice.IGST)).toFixed(2)]
            
          ]
        }
      },
      {
        text: 'Additional Details',
        style: 'sectionHeader'
      },


    {
      text:'PAN No.: DDABC0760F'
    },
 
    {
      text:'GST No.: 12ABCDE0120F1X1'
     
    },
 
    {
      text:'LUT No.: 154/CGST/Division-North/GGN/2020-2021-date-02-04-21'
     
    },
      
    {
          text: invoice.additionalDetails,
          margin: [0, 0 ,0, 15]          
      },
      {
        columns: [
          [{ qr: `${invoice.name}`, fit: '30' }],
          [{ text: 'Signature', alignment: 'right', italics: true}],
        ]
      },
      {
        text: 'Bank Details:',
        style: 'sectionHeader'
      },
      
      {
        text:'Account Name: BigStep Technologies Pvt. Ltd.',
        bold:true
        
      },
      {
        text:'Account No.: 10022560000199',
        bold:true
        
      },
      {
        text:'Bank: HDFC Bank Ltd.',
        bold:true
        
      },
      {
        text:'Account Address: HDFC Bank Ltd. DSS 13,Old Judicial Complex,',
        bold:true
        
      },
      {
        text:'Civil Lines,Gurgaon-122001,Haryana,india',
        bold:true
        
      },
      {
        text:'IFSC Code: HDFC0009113',
        bold:true
        
      },
   
      {
        canvas: [
        {
        type: 'line',
        x1: 0,
        y1: 130,
        x2: 535,
        y2: 130,
        lineWidth: 0.3,
        opacity : 0.5,
        margin : [15,15,15,70]
        }
        ]
        },
        {
        
        columns: [
        [
        {
        text: `Bigstep Technologies Private Limited. `,
        
        bold:true,
        margin : [0,30,0,0],
        fontSize : 10
        },
        { text: ` Judicial Complex, Sector 15`,fontSize : 10},
        { text: `Gurgaon-122001, Haryana,India`,fontSize : 10 },
        { text: `Email :- info@bigsteptech.com`,fontSize : 10 },
        { text: `CIN:U72200HR2009PTC038717` ,fontSize : 10}
        ],
        [
        {
        text: `2nd Floor,SCO-63,Old`,
        alignment: 'right',
        margin : [0,30,0,0],
        fontSize : 10
        },
        {
        text: 'Phone:- +91-9136773059',
        alignment: 'right',
        margin : [0,12],
        fontSize : 10
        },
        {
        text: `http://www.bigsteptech.com`,
        alignment: 'right',
        fontSize : 10
        }
        ],
        
        // { canvas: [{ type: 'line', x1: 10, y1: 10, x2: 595-10, y2: 10, lineWidth: 0.5 }] }
        
        ],
        
        },
  
      
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        margin: [0, 15,0, 15]          
      }
    }
  };
  pdfMake.createPdf(docDefinition).download();
 

}

getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}



}
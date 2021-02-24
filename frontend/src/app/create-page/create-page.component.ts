import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  teams=['SuperAdmin','SalesTeam']
  isSuperAdmin=false
  isSalesTeam=false
signupForm:FormGroup=new FormGroup({
  'name':new FormControl(null,Validators.required),
  'email':new FormControl(null,[Validators.required,Validators.email]),
  'password':new FormControl(null,Validators.required),
  'options':new FormControl(null,Validators.required)  
 });
  
    

  constructor(private router:Router,
    private homeService:HomeService,
    private route:ActivatedRoute,
   ) { }

  ngOnInit(): void {
   
  }

  onSubmit(){
console.log(this.signupForm)
console.log(this.signupForm.value.options)

    let name=this.signupForm.value.name
    let email=this.signupForm.value.email
    let password=this.signupForm.value.password
   if(this.signupForm.value.options==='SuperAdmin'){
     this.isSuperAdmin=true
   }else{
     this.isSalesTeam=true
   }
console.log(this.isSuperAdmin)
console.log(this.isSalesTeam)

   this.homeService.registerUser(name, email, password,this.isSuperAdmin,this.isSalesTeam)
   .subscribe(data=>{
     console.log(data)
  
   })
   this.isSalesTeam=false
   this.isSuperAdmin=false
    this.signupForm.reset()
    this.router.navigate(['/home'],{relativeTo:this.route})
  }
 

}

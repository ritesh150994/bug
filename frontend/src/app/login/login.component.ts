import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password:any
data:any
resData:any
errMessage:any

loginForm:FormGroup=new FormGroup({
   'email':new FormControl(null,[Validators.required,Validators.email]),
  'password':new FormControl(null,Validators.required),

 });

  constructor(private authService:AuthService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    
    let email=this.loginForm.value.email
    let password=this.loginForm.value.password

    this.authService.login(email,password)
    .subscribe(data=>{
      console.log(data)
    this.resData=data
    if(this.resData.body.message){
      this.errMessage=this.resData.body.message
    }else{
      this.router.navigate(['/home'],{relativeTo:this.route})
    }
    })
  }
onLogOut(){
  this.authService.logout()
}
 
     
}

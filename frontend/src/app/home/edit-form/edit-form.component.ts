import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  id:any;
  data:any;
isSuperAdmin=false;
isSalesTeam=false;

  teams=['SuperAdmin','SalesTeam']
  updateForm:FormGroup=new FormGroup({
    'name':new FormControl(null,Validators.required),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,Validators.required),
    'options':new FormControl(null,Validators.required)  
   });

  constructor(private route:ActivatedRoute,
    private router:Router,
    private homeService:HomeService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=params['id']
      }
    )
  this.homeService.getUserById(this.id).subscribe(
    res=>{
      console.log(res)
      this.data=res

      this.updateForm.patchValue({
        name:this.data.name,
        email:this.data.email
      })
    })
  
 
  }

  onUpdate(id:number){
    let name=this.updateForm.value.name
    let email=this.updateForm.value.email
     let password=this.updateForm.value.password
     if(this.updateForm.value.options==='isSuperAdmin'){
       this.isSuperAdmin=true
     }else{
       this.isSalesTeam=true
     }

     this.homeService.updateID(this.id,name,email,password,this.isSuperAdmin,this.isSalesTeam)
     .subscribe(data=>{
       console.log(data)
     })
     this.isSuperAdmin=false
     this.isSalesTeam=false
     this.updateForm.reset()
     this.router.navigate(['/home'],{relativeTo:this.route})
  }

}

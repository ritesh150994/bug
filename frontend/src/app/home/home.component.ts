import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthService } from '../login/auth.service';
import { HomeService } from './home.service';
import { User } from './users.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  displayedColumns: string[] = [ 'name', 'email','actions'];
  dataSource:User[]=[]


  constructor(
    private homeService:HomeService,
    private router:Router,private route:ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit(){
   let userdata=JSON.parse(localStorage.getItem('user'))
   console.log(localStorage.getItem('user'))
   console.log(userdata)

   if(userdata.isSuperAdmin===true){
    this.homeService.getUsers()
    .subscribe(rowData=>{
      console.log(rowData)
      this.dataSource=rowData
    }) 
   }else{
      console.log('not authorized')
  }
 
  }

Create(){
    this.router.navigate(['/create'])
 }
    
 
 onEdit(id:string){
      console.log(id)
      this.router.navigate([`/${id}/edit`],{relativeTo:this.route});
    }

   
onDelete(id:number){
        let r= confirm('Do you want to delete this???')
     if(r===true){
      console.log(id)
      this.homeService.deleteId(id)
      .subscribe(res=>{
        console.log(res)
        // this.dataSource=this.dataSource.filter()
      })
     }else{
       console.log("not removed user")
     }
    
    }


onLogOut(){
      this.authService.logout()
      this.router.navigate([''],{relativeTo:this.route});
    }
   
}



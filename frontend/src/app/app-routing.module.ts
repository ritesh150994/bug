import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInvoiceComponent } from './create-invoice/edit-invoice/edit-invoice.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { HeaderComponent } from './header/header.component';
import { EditFormComponent } from './home/edit-form/edit-form.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'header',component:HeaderComponent},
  {path:'create',component:CreatePageComponent},
  {path:':id/edit',component:EditFormComponent},
  {path:'manage-invoice',component:ManageInvoiceComponent},

  {path:':id/edit-invoice',component:EditInvoiceComponent},
{ path: 'create-invoice', loadChildren: () => import('./create-invoice/create-invoice.module').then(m => m.CreateInvoiceModule) },
{path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

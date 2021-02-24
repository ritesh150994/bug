import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio'
import {MatListModule} from '@angular/material/list'
// import {MatNativeDateModule} from '@angular/material/nativedate'
import {MatDatepickerModule} from  '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from "@angular/material/dialog";

const MaterialComponents=[
MatButtonModule,
MatTableModule,
MatToolbarModule,
// MatNativeDateModule,
  MatDatepickerModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule, 
  MatToolbarModule, 
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,
  MatSelectModule,
  // MatDialogModule,
  // MatDialogActions,
  // MatDialogContent,
  // MatDialogClose

  MatPaginatorModule,
  MatSortModule,


]

@NgModule({

  imports: [MaterialComponents ],
  exports:[MaterialComponents]
})
export class MaterialModule { }

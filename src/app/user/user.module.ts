import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    UserUpsertComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class UserModule { }

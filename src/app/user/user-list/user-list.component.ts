import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  userLists:any;

  constructor(private dataService:DataService) {}

  ngOnInit(): void {
    this.userLists = new MatTableDataSource(this.dataService.DUMMY_USERS);
  }
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  editUser(user:any){
    console.log(user);
  }
  deleteUser(user:any){
    console.log(user);
  }
}

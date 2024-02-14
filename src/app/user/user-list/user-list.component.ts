import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  tableData: any;
  userDataList: any;
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  @Output() userDataEvent = new EventEmitter<any>();

  constructor(private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    this.userDataList = await this.dataService.getUsers().toPromise();
    this.tableData = new MatTableDataSource(this.userDataList);
  }

  editUser(user: any) {
    //-- Pass the data to the upsert component
    let existingUser = this.userDataList.find(
      (existingUser: any) => existingUser.id == user.id
    );
    this.userDataEvent.emit(existingUser);
  }

  async deleteUser(user: any) {
    this.dataService.deleteUser(user.id).subscribe((res) => {
      if(res) {
        this.dataService.showAlert('Removed');
      }
    });
    this.userDataList = await this.dataService.getUsers().toPromise();
  }
}

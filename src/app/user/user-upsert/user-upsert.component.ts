import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss'],
})
export class UserUpsertComponent implements OnInit {
  userForm!: FormGroup;
  isUserAlreadyExist: boolean = false;
  userDataList: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]*'),
          (control) => {
            if (control.value && control.value.toString().length < 10) {
              return { minLength: true };
            }
            return null;
          },
        ]),
      ],
      address: ['', Validators.required],
    });
    this.userDataList = await this.dataService.getUsers().toPromise();
  }
  //-- This methods remove extra numbers if user entered more than 10 numbers
  onPhoneInput(event: any) {
    const value = event.target.value;
    if (value.length > 10) {
      event.target.value = value.slice(0, 10);
    }
  }

  async onSubmitForm() {
    if (this.userForm.valid) {
      if (this.doesUserExist(this.userForm.value)) {

        this.isUserAlreadyExist = true;

        let existingUserIndex = this.userDataList.findIndex(
          (user: any) =>
            this.userForm.value.id == user.id ||
            this.userForm.value.email === user.email ||
            Number(this.userForm.value.phone) === Number(user.phone)
        );

        let userPayload = {
          ...this.userForm.value,
          id: this.userForm.value.id
            ? this.userForm.value.id
            : this.userDataList[existingUserIndex].id,
        };

        this.dataService.updateUser(userPayload).subscribe(async (res) => {
          if (res) {
            this.userDataList = await this.dataService.getUsers().toPromise();
            this.dataService.showAlert('Updated');
          }
        });
      } else {
        this.userForm.value.id = Math.floor(
          100000 + Math.random() * 900000
        );
        this.dataService.addUser(this.userForm.value).subscribe(
          async (res) => {
            if (res) {
              this.dataService.showAlert('Added');
              this.userDataList = await this.dataService.getUsers().toPromise();
            }
          },
          (err) => {
            console.error(err);
          }
        );
        this.userForm.reset();
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  doesUserExist(user: any): boolean {
      return this.userDataList.some(
        (existingUser: any) =>
          existingUser.id == user.id ||
          existingUser.email == user.email ||
          Number(existingUser.phone) == user.phone
      );
  }

  userDataFromUserList(userData: any) {
    this.userForm.reset();
    this.userForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      id: userData.id,
    });
  }
}

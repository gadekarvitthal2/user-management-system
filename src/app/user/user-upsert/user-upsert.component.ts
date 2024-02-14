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
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router:Router
  ) {}

  ngOnInit(): void {
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
  }
  //-- This methods remove extra numbers if user entered more than 10 numbers
  onPhoneInput(event: any) {
    const value = event.target.value;
    if (value.length > 10) {
      event.target.value = value.slice(0, 10);
    }
  }

  onSubmitForm() {
    console.log(this.userForm.value);
    this.dataService.DUMMY_USERS.push(this.userForm.value);
    console.log('this.dataService.DUMMY_USERS :>> ', this.dataService.DUMMY_USERS);
    if (this.userForm.valid) {
      alert('Form submitted successfully');
      this.router.navigate(['/user-list'])
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}

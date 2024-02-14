import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  DUMMY_USERS = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1234567890' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '9876543210' },
    { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', phone: '5551234567' },
    { id: 4, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '9998887776' },
    { id: 5, firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', phone: '3332221110' },
  ];
  constructor() { }
}

# UserManagementSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

Before running this project, make sure you have the following installed:

- Node.js: [Download](https://nodejs.org/)
- Angular CLI: Install globally via npm: `npm install -g @angular/cli`
- JSON Server: Install globally via npm: `npm install -g json-server`

## Getting Started

1. Clone this repository:
git clone https://github.com/gadekarvitthal2/user-management-system.git

2. Navigate to the project directory: 
cd user-management-system

3. Install dependencies:
npm install

4. start the Angular development server, run:
ng serve
Navigate to http://localhost:4200/ in your browser to view the Angular application.

5. Start the json-server using following command
npx json-server db.json

if it is not work then try following command
json-server --watch db.json

6. JSON Server Endpoints
GET /userData: Get all user data.
GET /userData/:id: Get user data by ID.
POST /userData: Create a new user.
PUT /userData/:id: Update user data by ID.
DELETE /userData/:id: Delete user data by ID.







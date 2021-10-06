# Tasks Management Web App

This project is a simple task management web app with the following functionalities:
  * Sign up new users
  * User login
  * Password reset by email
  * CRUD project
  * CRUD tasks
  
## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/DilanOjeda/tasks-management-web-app.git
   cd tasks-management-web-app
   ```

2. Install the npm packages

   ```bash
   npm install
   ```

   Also install `nodemon` globally, if you don't have it yet.

   ```bash
   npm install -g nodemon
   ```

3. Congfigure environment settings

   Create a file with the following name and location `.env` and copy the contents from `.env.example` into it. Replace the values with your specific configuration. Don't worry, this file is in the `.gitignore` so it won't get pushed to github.

   ```javasscript
    # Database
    DATABASE_NAME=your-db-name
    DATABASE_USER=your-db-username 
    DATABASE_PASSWORD=your-db-password
    DATABASE_HOST=your-db-host
    DATABASE_PORT=your-db-port
    
    # Nodemailer 
    EMAIL_USER=your-email-user
    EMAIL_PASSWORD=your-email-password
    EMAIL_PORT=your-email-port
    EMAIL_HOST=your-email-host
   ```

4. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run dev

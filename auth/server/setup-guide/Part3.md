[Part 1](./Part1.md) | [Part 2](./Part2.md) | [Part 3](./Part3.md) | [Part 4](./Part4.md) | [Part 5](./Part5.md)
# Part 3: Create Registration Route

## Goals
Register a user and send back a JSON Web Token  back to the client so that it can be stored on the clients local machine as a cookie

- Register user in our database
- Send back a JWT

## Install encryption module
- `bcryptjs`
- `jwt-simple`
## Steps
- Navigate to the `authentication.js` file in the `routes` folder
- Create a new route handler for a `post` request for a `register` route
- Collect data form the header for the `email` and `password`
- Encrypt the password 
- Attach the `async` function decorator to callback in the `authentication` post handler 
- Check to see if this user is already in the database 
    - if the user is already in the database, send back an error message to the client with a status of 422 
    - if the user is not in the database, create a new record in the database with user's email and password 
    - send back a JWT to the client
        - **we will do this together in lecture**
        - for now, just send back a string that says "JWT" to the client

- **Make sure your db logic is in a try/catch block**
- **If the entire try fails, send back an error to the client with a status of 422.**
- Test that you can add a user to your database by using the **Thunder Cloud** VS Code extension.






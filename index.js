const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const userController = require("./controller/userController");
const leaveSubmitController = require('./controller/leaveSubmitController')
// MIDDLEWARE

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

// ROUTES
app.post("/login", userController.loginUser);
app.post("/users", userController.createUser);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getOneUser);
app.put("/users/:id", userController.updateOneUser);
app.delete("/users/:id", userController.deleteOneUser);


// Get user details (protected route)
app.get('/userDetails', userController.verifyToken, userController.getUserDetails);


// Get all leave submissions
app.get('/leaveSubmit', leaveSubmitController.getAllLeaveSubmissions);

// Insert a new leave submission
app.post('/leaveSubmit', leaveSubmitController.createLeaveSubmission);

// PORT
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

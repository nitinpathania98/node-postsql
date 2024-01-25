const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const userController=require("./controller/userController");

//MIDDLEWARE
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)



app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

//ROUTES
app.post("/users", userController.createUser)

app.get("/users", userController.getAllUsers)

app.get("/users/:id", userController.getOneUser)

app.put("/users/:id", userController.updateOneUser);

app.delete("/users/:id", userController.deleteOneUser)


//PORT

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
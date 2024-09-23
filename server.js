import express from'express';
import uuid from 'uuid';
import bcrypt from 'bcrypt';
const port = 3000;
const app = express();
const saltRounds = 10;

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

const users = [ 
    {
        id: "1",
        email: "email1",
        password: "password1"
    },

    {
        id: "2",
        email: "email2",
        password: "password2"
    },

    {
        id: "3",
        email: "email3",
        password: "password3"
    }
]



app.get ("/users",  (req, res) => {
    res.send(users);
});



app.get ("/users/:id", (req, res) => {
    const id = req.params.id;
    users.forEach(user => {
        if (user.id == id) {
            res.send(user);
        }
        else{
            console.log("error");
        }})
});
 
app.use(express.json());
app.post("/create", (req, res) => {
    let newUser = {
        id : uuid.v1(),
        email : req.body.email,
        password : req.body.password
    }
    
    users.push(newUser);
    res.status(200).json(newUser);
 
});


app.use(express.json());
app.put("/edit/:id", (req, res) => {
    const id = req.params.id;
    const oldUser = users.find((user) => user.id == id);
    let newUser = {
        id : oldUser.id,
        email : req.body.email,
        password : req.body.password
    }
    const index = users.findIndex(i => i.id === oldUser.id);                
    users[index] = newUser;
    res.status(200).json(newUser);
 
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const deleteUser = users.find((user) => user.id == id);
    const index = users.findIndex(i => i.id === deleteUser.id);                
    users.splice(index, 1);
    res.status(200).json(deleteUser);
 
});


app.use(express.json());
app.post("/checkUser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    const findUser = users.find((user) => user.email == email & user.password == password);
    
    if (findUser) {
        res.send("User is connected");
    } else {
        res.send("wrong credentials");
    }
 
});



app.listen(port, ()=> {console.log(`server listen to port:  ${port}`);
});



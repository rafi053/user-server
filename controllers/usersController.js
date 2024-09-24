import jsonfile from 'jsonfile';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const productUrl = "https://dummyjson.com/products";
const DBUrl = "https://jsonplaceholder.typicode.com/posts";
const file = 'C:/Users/Public/Downloads/_kodcode/week 5 ex/user-server/data/users.json';
const users = jsonfile.readFileSync(file);
const arrayUsers = Array.from(users);



export const getAllUsers = (req, res) => {
    const allUsers =  users
    res.send(allUsers); 
}




export const getUser = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if (user) {
        res.send(user);
    } else {
        console.log("error");
    }
    
}


export const createUser = (req, res) => {
    let newUser = {
    id : uuid(),
    email : req.body.email,
    password : req.body.password
    }
    arrayUsers.push(newUser)
    jsonfile.writeFileSync(file, arrayUsers);
    res.status(200).json(newUser);
    
}


export const editUser = (req, res) => {
    const id = req.params.id;
    const oldUser = arrayUsers.find((user) => user.id == id);
    let newUser = {
        id : oldUser.id,
        email : req.body.email,
        password : req.body.password
    }
    const index = arrayUsers.findIndex(i => i.id === oldUser.id);                
    arrayUsers[index] = newUser;
    jsonfile.writeFileSync(file, arrayUsers);
    res.status(200).json(newUser);
    
}


export const deleteUser = (req, res) => {
    const id = req.params.id;
    const deleteUser = arrayUsers.find((user) => user.id == id);
    const index = arrayUsers.findIndex(i => i.id === deleteUser.id);                
    arrayUsers.splice(index, 1);
    jsonfile.writeFileSync(file, arrayUsers);
    res.status(200).json(deleteUser);
    
}


export const checkUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    const findUser = arrayUsers.find((user) => user.email == email & user.password == password);
    
    if (findUser) {
        res.send("User is connected");
    } else {
        res.send("wrong credentials");
    }
    
}


export const addProductToUser = async (req, res) => {
    const id = req.params.id;
    const findUser = arrayUsers.find((user) => user.id == id);
    const addToUser = await getProductByRandomId();
    let changeUser = {
        id : findUser.id,
        email : findUser.email,
        password : findUser.password,
        product : await addToUser
    }
    await addUserToDB(changeUser);
    const index = arrayUsers.findIndex(i => i.id === findUser.id);                
    arrayUsers[index] = changeUser;
    jsonfile.writeFileSync(file, arrayUsers);
    res.status(200).json(changeUser);
    
    
}


async function getProductByRandomId() {
    const randomId = getRandomNumber();
    try {
        const product = await axios.get(`${productUrl}/${randomId}`);
        return product.data;
      } catch (error) {
        console.log(error);
      }
}


function getRandomNumber() {
    return Math.floor(Math.random() * 30) + 1;
}

async function addUserToDB(user) {
    try {
        await axios.post(DBUrl, user);

      } catch (error) {
        console.log(error);
      }
}

import bcrypt from 'bcrypt';

const saltRounds = 10;
const userPassword = "1234";
const hashPassword = bcrypt.hash(userPassword, saltRounds, (err, hash) => {
     if (err) {
        console.log("err");
        
        return;
    }
return hash;
});




function isHash (hashPassword) {
    console.log(hashPassword);
    
    
}

console.log(hashPassword);

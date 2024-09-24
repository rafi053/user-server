import express from'express';
// import bcrypt from 'bcrypt';
import userRouter from './routes/usersRoutes.js';
const port = 3000;
const app = express();


app.use(express.json());

app.use('/users',userRouter);





app.listen(port, ()=> {console.log(`server listen to port:  ${port}`);
});



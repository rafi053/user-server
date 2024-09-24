import express from 'express';
import { getAllUsers, getUser, createUser, editUser, deleteUser, checkUser, addProductToUser } from '../controllers/usersController.js';


const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);
router.route('/create').post(createUser);
router.route('/edit/:id').put(editUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/checkUser').post(checkUser);
router.route('/addProduct/:id').post(addProductToUser)


export default router;
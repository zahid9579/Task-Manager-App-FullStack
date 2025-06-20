import express from 'express'
import { CreateTask, DeleteTask, ListAllTasks, UpdateStatus } from '../controllers/taskController.js';

const router = express.Router();

router.post('/create', CreateTask);
router.get('/allTasks', ListAllTasks);
router.put('/update/:id/', UpdateStatus);
router.delete('/delete/:id/', DeleteTask);


export default router
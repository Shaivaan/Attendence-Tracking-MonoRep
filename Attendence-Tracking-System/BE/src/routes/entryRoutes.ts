import express from 'express';
import { entryRecord, getAttendanceHistory, getDashboardStats } from '../controller/entryController';
import { uploadPhoto } from '../config/multer';

const entryRouter = express.Router();
entryRouter.post('/',uploadPhoto, entryRecord);
entryRouter.get('/dashboard', getDashboardStats);
entryRouter.get('/history',getAttendanceHistory);

export default entryRouter;
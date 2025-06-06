import express from 'express';
import cors from 'cors';
import entryRouter from './routes/entryRoutes';

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/entry', entryRouter);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Attendance Recorder API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
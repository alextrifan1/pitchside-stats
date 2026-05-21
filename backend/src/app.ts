import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import footballRoutes from './routes/footballRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/football', footballRoutes);

// Global Unhandled Error Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

export default app;
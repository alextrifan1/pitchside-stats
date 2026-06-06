import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {id: string};
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: Missing or invalid Bearer token'});
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is missing');
        }

        const decoded = jwt.verify(token, secret) as { userId: string};

        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Token expired or invalid'});
    }
};
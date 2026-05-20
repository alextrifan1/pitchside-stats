import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {email, password} = req.body;
            
            const {user, token} = await this.authService.register(email, password);
            
            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    favoriteTeams: user.favoriteTeams
                }
            });
        } catch (error: any) {
            if (error.message === 'User already exists') {
                res.status(409).json({ error: error.message });
                return;
            }

            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {email, password} = req.body;

            const {user, token} = await this.authService.login(email, password);

            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    favoriteTeams: user.favoriteTeams
                }
            });
        }  catch (error: any) {
            if (error.message === 'Invalid credentials') {
                res.status(401).json({ error: error.message });
                return;
            }
            next(error);
        }
    };
}
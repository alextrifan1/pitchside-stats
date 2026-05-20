import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

// acts as a factory
export const validate = (schema: ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ errors: error.issues});
            return;
        }
        res.status(500).json({ error: "Internal Server Error during validation" });
        return;
    }
}
import { Request, Response } from 'express';

export const TryCatch = (handler: (req: Request, res: Response) => Promise<any>) =>
    async (req: Request, res: Response) => {
        try {
            await handler(req, res);
        } catch (error) {
            console.error('An error occurred:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
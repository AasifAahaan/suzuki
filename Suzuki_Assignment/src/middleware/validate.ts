import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors: { [key: string]: string[] } = {};

        errors.array().forEach((error: any) => {
            if (!extractedErrors[error.param]) {
                extractedErrors[error.param] = [];
            }
            extractedErrors[error.param].push(error.msg);
        });

        return res.status(400).json({
            errors: extractedErrors
        });
    }
    next();
};

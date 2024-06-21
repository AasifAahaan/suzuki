import { body } from 'express-validator';

export const ValidateUser = [
    body('user').isString().withMessage('User must contain only letters'),
    body('age').isNumeric().withMessage('Age must be a number').custom((value) => {
        if (value < 0) {
            throw new Error('Age must be a positive number');
        }
        return true;
    }),
    body('mobile').matches(/^[6-9]{1}[0-9]{9}$/).withMessage('Invalid mobile number'),
    body('email').isEmail().withMessage('Invalid email address')
];
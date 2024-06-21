
import { Request, Response } from 'express';
import { TryCatch } from '../helper/errorHandler';
import { IUserDocument, User } from '../model/user';
import { isValidObjectId } from 'mongoose';

export class UserController {
    static handleAddUserController = TryCatch(async (req: Request, res: Response) => {
        const user: IUserDocument = req.body;
        const existingUserByEmail = await User.findOne({ email: user.email });
        const existingUserByMobile = await User.findOne({ mobile: user.mobile });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        } if (existingUserByMobile) {
            return res.status(400).json({ message: 'Mobile already exists' });
        }
        const newUser = new User(user);
        const response = await newUser.save();
        res.status(200).json({ success: true, response });
    });

    static handleGetUserByIdController = TryCatch(async (req: Request, res: Response) => {
        const id = req.params;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid id provided" });
        }
        const user = await User.findById(req?.params?.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    })

    static handleDeleteUserController = TryCatch(async (req: Request, res: Response) => {
        const id = req.params;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid id provided" });
        }
        const user = await User.findById(req?.params?.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const response = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, response });
    })

    static handleUpdateUserController = TryCatch(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id || !isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid id provided" });
        }
        const userData: IUserDocument = req.body;
        const response = await User.findByIdAndUpdate(req?.params?.id, userData, { new: true });
        if (!response) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, response });
    })

    static getAllUser = TryCatch(async (req: Request, res: Response) => {
        const response = await User.find({})
        res.status(200).json({ success: true, response })
    })
}
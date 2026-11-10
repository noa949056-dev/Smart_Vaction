import { isValidObjectId } from "mongoose";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // ? פרמטרים לא חובה עם ערכי ברירת מחדל

        const users = await User.find() // חיפוש באוסף
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await User.find().countDocuments(); // מחזיר כמה משתמשים יש באוסף

        res.json({ data: users, total });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'id not valid' });

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateUser = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'id not valid' });

        const user = await User.findByIdAndUpdate(id,
            {
                $set: req.body.x, // עדכון/הוספת שדה לאוביקט
               
                $addToSet: { roles: req.body.y }, // הוספת איבר למערך בלי כפולים
            },
            { new: true }); // יחזיר את האוביקט המעודכן

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'id not valid' });

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
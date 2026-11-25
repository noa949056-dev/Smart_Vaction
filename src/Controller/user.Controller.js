import { isValidObjectId } from "mongoose";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";


//הרשמה
export const register = async (req, res, next) => {
  try {
    const { username, password, address, phone } = req.body;

    const user = await User.create({
      username,
      password,
      address,
      phone,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .select("+password");

    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new AppError("invalid username or password", 401);
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        address: user.address,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findById(id).select("+password");

    if (!user) {
      throw new AppError("user not found", 404);
    }

    user.password = password;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};


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
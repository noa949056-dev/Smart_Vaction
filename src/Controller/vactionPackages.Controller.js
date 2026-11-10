import { isValidObjectId } from "mongoose";
import VacationPackage from "../models/vacationPackage.model.js";

export const getAllVacationPackages = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // ? פרמטרים לא חובה עם ערכי ברירת מחדל

        const vacationPackages = await VacationPackage.find() // חיפוש באוסף
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await VacationPackage.find().countDocuments(); // מחזיר כמה חבילות נופש יש באוסף

        res.json({ data: vacationPackages, total });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getVacationPackageById = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'vacation package not found' });

        const vacationPackage = await VacationPackage.findById(id);

        if (!vacationPackage) {
            return res.status(404).json({ error: 'vacation package not found' });
        }

        return res.json(vacationPackage);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addVacationPackage = async (req, res, next) => {
    try {
        const newVacationPackage = new VacationPackage(req.body);
        await newVacationPackage.save();
        res.status(201).json(newVacationPackage);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateVacationPackage = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'vacation package not valid' });

        const vacationPackage = await VacationPackage.findByIdAndUpdate(id,
            {
                $set: req.body.x, // עדכון/הוספת שדה לאוביקט
                // $unset: { price: true }, // מחיקת שדה מהחבילה הנוכחית
                $addToSet: { features: req.body.y }, // הוספת תכונה/איבר למערך בלי כפולים
            },
            { new: true }); // יחזיר את האוביקט המעודכן

        if (!vacationPackage) {
            return res.status(404).json({ error: 'vacation package not found' });
        }

        return res.json(vacationPackage);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteVacationPackage = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'vacation package not valid' });

        const vacationPackage = await VacationPackage.findByIdAndDelete(id);

        if (!vacationPackage) {
            return res.status(404).json({ error: 'vacation package not found' });
        }

        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
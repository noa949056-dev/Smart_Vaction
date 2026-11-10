import { isValidObjectId } from "mongoose";
import Destination from "../models/destination.model.js";

export const getAllDestinations = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // ? פרמטרים לא חובה עם ערכי ברירת מחדל

        const destinations = await Destination.find() // חיפוש באוסף
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Destination.find().countDocuments(); // מחזיר כמה יעדים יש באוסף

        res.json({ data: destinations, total });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getDestinationById = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'destination not valid' });

        const destination = await Destination.findById(id);

        if (!destination) {
            return res.status(404).json({ error: 'destination not found' });
        }

        return res.json(destination);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addDestination = async (req, res, next) => {
    try {
        const newDestination = new Destination(req.body);
        await newDestination.save();
        res.status(201).json(newDestination);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateDestination = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'destination not valid' });

        const destination = await Destination.findByIdAndUpdate(id,
            {
                $set: req.body.x, // עדכון/הוספת שדה לאוביקט
                // $unset: { description: true }, // מחיקת שדה מהיעד הנוכחי
                $addToSet: { tags: req.body.y }, // הוספת תגית/איבר למערך בלי כפולים
            },
            { new: true }); // יחזיר את האוביקט המעודכן

        if (!destination) {
            return res.status(404).json({ error: 'destination not found' });
        }

        return res.json(destination);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteDestination = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'destination not valid' });

        const destination = await Destination.findByIdAndDelete(id);

        if (!destination) {
            return res.status(404).json({ error: 'destination not found' });
        }

        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
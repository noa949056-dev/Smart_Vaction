import { isValidObjectId } from "mongoose";
import Hotel from "../models/hotel.model.js";

export const getAllHotels = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // ? פרמטרים לא חובה עם ערכי ברירת מחדל

        const hotels = await Hotel.find() // חיפוש באוסף
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Hotel.find().countDocuments(); // מחזיר כמה מלונות יש באוסף

        res.json({ data: hotels, total });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getHotelById = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'hotel not valid' });

        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        return res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addHotel = async (req, res, next) => {
    try {
        const newHotel = new Hotel(req.body);
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'hotel not valid' });

        const hotel = await Hotel.findByIdAndUpdate(id,
            {
                $set: req.body.x, // עדכון/הוספת שדה לאוביקט
                // $unset: { rating: true }, // מחיקת שדה למלון הנוכחי
                $addToSet: { amenities: req.body.y }, // הוספת איבר למערך בלי כפולים
            },
            { new: true }); // יחזיר את האוביקט המעודכן

        if (!hotel) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        return res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'hotel not valid' });

        const hotel = await Hotel.findByIdAndDelete(id);

        if (!hotel) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
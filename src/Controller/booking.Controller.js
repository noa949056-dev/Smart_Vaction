import { isValidObjectId } from "mongoose";
import Booking from "../models/booking.model.js";

export const getAllBookings = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query; // ? פרמטרים לא חובה עם ערכי ברירת מחדל

        const bookings = await Booking.find() // חיפוש באוסף
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Booking.find().countDocuments(); // מחזיר כמה הזמנות יש באוסף

        res.json({ data: bookings, total });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getBookingById = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'booking not valid' });

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ error: 'booking not found' });
        }

        return res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const addBooking = async (req, res, next) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateBooking = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'booking not valid' });

        const booking = await Booking.findByIdAndUpdate(id,
            {
                $set: req.body.x, // עדכון/הוספת שדה לאוביקט
                // $unset: { status: true }, // מחיקת שדה מההזמנה הנוכחית
                $addToSet: { notes: req.body.y }, // הוספת הערה/איבר למערך בלי כפולים
            },
            { new: true }); // יחזיר את האוביקט המעודכן

        if (!booking) {
            return res.status(404).json({ error: 'booking not found' });
        }

        return res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteBooking = async (req, res, next) => {
    try {
        const { id } = req.params; // פרמטרים חובה מזהי משאב

        if (!isValidObjectId(id))
            return res.status(404).json({ error: 'booking not valid' });

        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ error: 'booking not found' });
        }

        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
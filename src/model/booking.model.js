import mongoose from "mongoose";

const guestDetailsSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    idNumber: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VacationPackage",
      required: true,
    },
    //embadding את המודל של פרטי האורחים בתוך המודל של ההזמנה
    guestsDetails: {
      type: [guestDetailsSchema],
      required: true,
      validate: {
        validator: (guests) => guests.length > 0,
        message: "At least one guest is required",
      },
    },
    totalAmountPaid: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
    specialRequests: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
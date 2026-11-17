import mongoose from "mongoose";

// סכמה למקסימום תפוסה של החבילה
const maxOccupancySchema = new mongoose.Schema(
  {
    maxAdults: { type: Number, required: true, min: 1 },
    maxChildren: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);
// סכמה לחבילת חופשה
const vacationPackageSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          return !this.startDate || value > this.startDate;
        },
        message: "endDate must be after startDate",
      },
    },
    //השתמשות במודל זה כדי להגדיר את מספר המבוגרים והילדים המקסימלי שניתן להזמין עבור החבילה עלי ידי embadedding את המודל הזה בתוך המודל של חבילת החופשה
    maxOccupancy: { type: maxOccupancySchema, required: true },
    boardBasis: {
      type: String,
      required: true,
      enum: ["הכל כלול", "חצי פנסיון", "לינה וארוחת בוקר", "ללא ארוחות"],
    },
    totalPrice: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 100 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

vacationPackageSchema.index({ isAvailable: 1, startDate: 1, endDate: 1 });

export default mongoose.model("VacationPackage", vacationPackageSchema);
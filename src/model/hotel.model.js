import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    address: { type: String, required: true, trim: true },
    amenities: { type: [String], default: [] },
    basePricePerNight: { type: Number, required: true, min: 0 },
    contactPhone: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    regionName: { type: String, required: true, trim: true },
    cityName: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

destinationSchema.index({ country: 1, cityName: 1 });

export default mongoose.model("Destination", destinationSchema);
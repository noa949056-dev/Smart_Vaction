import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/db.js";

import bookingRouter from "./src/Routes/bookingRoutes.js";
import destinationRouter from "./src/Routes/destinationRoutes.js";
import hotelRouter from "./src/Routes/hotelRoutes.js";
import userRouter from "./src/Routes/userRoutes.js";
import vacationPackageRouter from "./src/Routes/vacationPackageRoutes.js";
import { errorHandler } from "./middlewares/errors.middleware.js";

const app = express();
const port = process.env.PORT ?? 5000;

// קריאת JSON
app.use(express.json());

// קריאת נתוני טפסים
app.use(express.urlencoded({ extended: true }));

// בדיקה שהשרת עובד
app.get("/", (req, res) => {
  res.send("Smart Vacation Server");
});

// ראוטרים
app.use("/users", userRouter);
app.use("/destinations", destinationRouter);
app.use("/hotels", hotelRouter);
app.use("/vacation-packages", vacationPackageRouter);
app.use("/bookings", bookingRouter);

// כתובת שלא קיימת
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      status: 404,
      type: "Not Found",
    },
  });
});

// טיפול בשגיאות - חייב להיות אחרון
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

startServer();
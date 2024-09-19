import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { router } from "./routes/userRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { doctorRouter } from "./routes/doctorRoutes.js";

//dot env
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter)

//port
const port = process.env.PORT || 3000;
//listen port
app.listen(port, () => {
  console.log(`server running in ${process.env.DEV_MODE} mode on port ${port}`);
});

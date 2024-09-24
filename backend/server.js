import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
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
app.use(cors({
    origin: 'https://docslot-five.vercel.app', // allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
  credentials: true,
}))

//routes
app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("hello from backend!");
});

if (process.env.DEV_MODE === "development") {
  //port
  const port = process.env.PORT || 3000;
  //listen port
  app.listen(port, () => {
    console.log(`server running in fine.`);
  });
}


export default app;

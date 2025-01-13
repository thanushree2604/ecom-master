// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

app.use(
  cors({
    origin: [
      "https://ecom-frontend-mauve-beta.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Accept-Version",
      "Content-Length",
      "Content-MD5",
      "Date",
      "X-Api-Version",
    ],
    credentials: true,
    preflightContinue: false,
    maxAge: 2592000,
  })
);
app.options("*", cors());

// const corsOptions = {
//   origin: ["https://ecom-frontend-mauve-beta.vercel.app", "http://localhost:5173"],
//   methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: "*",
//   maxAge: 259200,
//   preflightContinue: false,
// };
// app.use(cors(corsOptions));
// app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_SWAYAM);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

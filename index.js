const express = require("express");
const UserAuthRouter = require("./routes/UserAuthRouter");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors")
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://cograd-erp.vercel.app",

];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use(express.json());
require("dotenv").config();

//routes
app.use("/user", UserAuthRouter);

dbConnect();
app.listen(4000, () => {
  console.log("http://localhost:4000");
});

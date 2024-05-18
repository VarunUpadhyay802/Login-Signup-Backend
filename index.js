const express = require("express");
const UserAuthRouter = require("./routes/UserAuthRouter");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors");
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://cograd-erp.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use(express.json());

// Connect to the database
dbConnect();

// Use the user authentication router
app.use("/user", UserAuthRouter);

// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

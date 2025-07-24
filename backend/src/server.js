import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./db/index.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, welcome to my server!");
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});

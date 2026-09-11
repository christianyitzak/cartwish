require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/users");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("MongoDB Connection failed..", err))

app.use(express.json());
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const createStaticUser = require("./utils/createStaticUser");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  // await createStaticUser();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();

require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const config = require("./utils/config");
const tokenExtractor = require("./utils/tokenExtractor");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./utils/error_handler");

const app = express();

const mongoUrl = config.MONGODB_URI;

logger.info("connecting to ", mongoUrl);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected succesfully to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

module.exports = app;

const express = require("express");
const app = express();

// ** Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("Our custom middleware!")
  req.requestTime = new Date().toISOString()
  next()
})

// ** Routes
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)


module.exports = app
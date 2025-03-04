const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const productRouter = require("./routers/product.router");
const userRouter = require("./routers/user.router");
const cartRouter = require("./routers/cart.router");
const { applyTimestamps } = require("./models/Product");
const app = express();
const BASE_URL = process.env.BASE_URL; //
const PORT = process.env.PORT; //เชื่อมกับ PORT
const DB_URL = process.env.DB_URL;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-output.json");
const stripeRouter = require("./routers/stripe.router")

//Connect to Mongo DB
try {
  mongoose.connect(DB_URL);
  console.log("Connect To Mongo DB Successfully");
} catch (error) {
  console.log("DB Connection Failed");
}

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json()); //ทำให้อ่านไฟล์ json
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE Shop Resful API</h1>");
});

app.use("/uploads", express.static(__dirname + "/uploads"));

//use Router
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/stripe", stripeRouter)

app.listen(PORT, () => {
  console.log("Server Running on http://localhost:" + PORT); //เชื่อมกับ PORT
});

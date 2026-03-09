const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/ordersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.use("/", orderRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

const app = express();
dotenv.config();

// chamamos a conexão do dataBase depois do dotenv pois ele usa as variáveis de ambiente do arquivo
connectToDatabase();

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.listen(8000, () => console.log("Listening on port 8000!"));





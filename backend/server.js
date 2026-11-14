
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use(cors({
//     origin: process.env.FRONTEND_URL || "*"
// }));

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,
        "http://localhost:5173"
    ]
}));

app.use(express.static("public"));

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });

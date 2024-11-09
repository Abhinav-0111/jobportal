import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Connection from "./config/db.js";
import router from "./route/route.js";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
    Connection();
    console.log(`Server Running Successfully on port ${PORT}`);
});

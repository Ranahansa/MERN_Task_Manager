const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./database/connect");
require("dotenv").config();

app.use(express.json())

app.use("/tasks", tasks);

const port =3000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error.message);
    }
};
start()
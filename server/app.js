const express = require("express");
const app = express();
const tasks = require("./routes/tasks");


app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use("/tasks", tasks);



const port =3000

app.listen(port, () => {
    console.log(`server is running:${port}`)
})
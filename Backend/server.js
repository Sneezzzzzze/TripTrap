
import express from "express";
import activityRouter from "./services/ActivityService/handler.js";


const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routers
app.use("/activity", activityRouter);



app.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
});



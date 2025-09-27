import activityRouter from "./services/ActivityService/handler.js";


const express = require("express");
const App = express();
const port = 3000;

app.use(express.json());


App.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routers
app.use("/activity", activityRouter);



App.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
});



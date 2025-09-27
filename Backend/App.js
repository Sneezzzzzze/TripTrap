const express = require("express");
const App = express();
const port = 3000;

App.get("/", (req, res) => {
    res.send("Hello World!");
});

App.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
});

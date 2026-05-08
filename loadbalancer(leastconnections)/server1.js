const express = require("express");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

    // Simulate heavy processing
    const delay = 5000;

    await new Promise(resolve =>
        setTimeout(resolve, delay)
    );

    res.json({
        message: "Hello World!",
        responseTime: delay,
        server: "server1"
    });
});

app.listen(3001, () => {
    console.log("Server running at 3001");
});
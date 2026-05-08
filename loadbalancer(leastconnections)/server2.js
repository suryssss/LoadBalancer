
//server2 running at port 3002
const express = require("express")

const app = express()
app.use(express.json())


app.get("/", async (req, res) => {

    const delay = 2000

    await new Promise(resolve =>
        setTimeout(resolve, delay)
    );

    res.json({
        message: "Hello World!",
        responseTime: delay,
        server: "server2"
    });
})

app.listen(3002, () => {
    console.log("server is running at 3002")
})
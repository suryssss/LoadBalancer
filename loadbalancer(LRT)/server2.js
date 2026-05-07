
//server2 running at port 3001
const express = require("express")

const app = express()
app.use(express.json())


app.get("/", (req, res) => {

    const delay = Math.random() * 300
    setTimeout(() => {
        res.json({
            message: "Hello World!",
            responseTime: delay,
            server: "server2"
        })
    }, delay)
})

app.listen(3002, () => {
    console.log("server is running at 3002")
})
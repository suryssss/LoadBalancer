
//server1 running at port 3001
const express = require("express")

const app = express()
app.use(express.json())


app.get("/", (req, res) => {

    const delay = Math.random() * 300
    setTimeout(() => {
        res.json({
            message: "Hello World!",
            responseTime: delay,
            server: "server1"
        })
    }, delay)
})

app.listen(3001, () => {
    console.log("server is running at 3001")
})

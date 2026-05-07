
//server2 running at port 3002
const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    const delay = Math.random() * 300
    setTimeout(() => {
        res.json({
            message: "hello world",
            responseTime: delay,
            server: "server3"
        })
    }, delay)
})

app.listen(3003, () => {
    console.log("server is running on port 3003")
})
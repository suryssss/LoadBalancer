
//server2 running at port 3003
const express = require('express')

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    const delay = 1000

    await new Promise(resolve =>
        setTimeout(resolve, delay)
    );

    res.json({
        message: "Hello World!",
        responseTime: delay,
        server: "server3"
    });
})

app.listen(3003, () => {
    console.log("server is running on port 3003")
})
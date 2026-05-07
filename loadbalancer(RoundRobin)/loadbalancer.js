const express = require("express")
const axios = require("axios")

const app = express()

const SERVERS = [
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
]
let current = 0
async function getNextServer() {
    const server = SERVERS[current]
    current = (current + 1) % SERVERS.length
    return server
}

app.get("/", async (req, res) => {
    const response = await getNextServer()
    res.json({
        routedTo: response,
        data: response.data
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
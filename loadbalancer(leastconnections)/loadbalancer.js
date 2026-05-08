const express = require("express")
const axios = require("axios")

const app = express()
const SERVERS = [
    {
        url: "http://localhost:3001",
        requests: 0,
        totalRequests: 0
    },
    {
        url: "http://localhost:3002",
        requests: 0,
        totalRequests: 0
    },
    {
        url: "http://localhost:3003",
        requests: 0,
        totalRequests: 0,
    }
]

let lastSelectedIndex = -1

//return least connected server
function getLeastConnectionsServer() {
    let minConnections = Infinity
    let candidates = []

    for (let i = 0; i < SERVERS.length; i++) {
        if (SERVERS[i].requests < minConnections) {
            minConnections = SERVERS[i].requests
            candidates = [i]
        }
        else if (SERVERS[i].requests === minConnections) {
            candidates.push(i)
        }
    }
    const selectionIndex = candidates.find(idx => idx > lastSelectedIndex) ?? candidates[0];
    lastSelectedIndex = selectionIndex;
    return SERVERS[selectionIndex];


}

//route request to least connected server
app.get("/", async (req, res) => {
    const server = getLeastConnectionsServer()
    server.requests++
    server.totalRequests++
    try {
        const response = await axios.get(server.url)
        res.json({
            message: "Hello World!",
            responseTime: response.data.responseTime,
            server: server.url
        })
    } catch (error) {
        console.error("Error", error.message)
        res.status(500).send("Error")
    } finally {
        server.requests--
        console.log(`Request completed for server: ${server.url}`)
    }
})

app.get("/stats", (req, res) => {
    res.json({
        servers: SERVERS.map(server => {
            return {
                url: server.url,
                currentConnections: server.requests,
                totalRequests: server.totalRequests
            }
        })
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

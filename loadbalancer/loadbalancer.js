// a load balancer using least-response-time algo

const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

//an array of mulitple servers running at differnt localhosts


const SERVERS = [
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
]


//function to check the fastest server


async function getFastestServer() {
    let fastest = null
    let bestTime = Infinity


    //looping through all the servers and checking the response time
    //instead of going sequentially using loop we use promise for parallel requesting
    //using promise.all it is more efficient


    Promise.all(SERVERS.map(async (server) => {
        const start = Date.now()
        try {
            //caling the get request to the server

            await axios.get(server)

            //calculating the response time

            const responseTime = Date.now() - start

            //if the response time is less than the best time, then update the best time and the fastest server

            if (responseTime < bestTime) {
                bestTime = responseTime
                fastest = server
            }
        } catch (error) {
            console.log("server down")
        }
    }))
    return fastest
}

//handling the incoming request

app.get('/', async (req, res) => {

    //calling the fastest server

    const fastestServer = await getFastestServer()

    //if no server is available, return error

    if (!fastestServer) {
        return res.status(503).json({
            error: "no server available"
        })
    }

    //making the request to the fastest server


    const response = await axios.get(fastestServer)
    //sending the response to the client

    res.json({
        routedTo: fastestServer,
        message: response.data.message,
        responseTime: response.data.responseTime
    })
})

app.listen(3000, () => {
    console.log("loadbalancer is running on port 3000")
})
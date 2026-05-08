const axios = require('axios');

async function sendRequests() {
    console.log("Sending 10 concurrent requests to the load balancer...");
    
    const requests = Array.from({ length: 10 }).map((_, i) => {
        return axios.get('http://localhost:3000/')
            .then(res => {
                console.log(`Request ${i + 1} completed: Server ${res.data.server} (Response Time: ${res.data.responseTime}ms)`);
            })
            .catch(err => {
                console.error(`Request ${i + 1} failed: ${err.message}`);
            });
    });

    await Promise.all(requests);
    console.log("\nAll requests completed.");
    
    const stats = await axios.get('http://localhost:3000/stats');
    console.log("\nLoad Balancer Stats:");
    console.table(stats.data.servers);
}

sendRequests();

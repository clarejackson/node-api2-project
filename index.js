// require your server and launch it here
const server = require("./api/server")
require("dotenv").config()

const port = process.env.PORT || 5000;

server.listen(port, () => {
	console.log(`running at http://localhost:${port}`)
})
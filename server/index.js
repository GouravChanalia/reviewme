const http = require("node:http");
const app = require("./app");
const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server started listening at PORT: ${PORT}`);
});

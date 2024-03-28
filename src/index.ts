// const http = require("http");

// const server = http.createServer(async (req, res) => {
//   if (req.method === "GET" && req.url === "/") {
//     // res.statusCode(200);
//     res.end();
//   }
// });
// server.listen(3000, () => {
//   console.log("server on http://localhost:3000");
// });
import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";
// app.listen(3000, () => {
//   console.log("hello on http://localhost:3000");
// });
app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
});

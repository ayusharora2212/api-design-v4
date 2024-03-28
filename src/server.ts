import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { error } from "console";
const app = express();

// app.use(morgan("dev")) //middleware that just consoles

//custom middleware
// app.use((req,res,next)=>{
//   req.shh_secret="doggy"
//   next()
// })
app.use(express.json());
app.get("/", (req, res, next) => {
  // console.log("hello from express");
  // res.status(200);
  res.json({ message: "hello" });
  //this is an synchronous error
  //express doesn not know how to handle async errors
  //async will crash the server
  // throw new error("hello");----->this is sync error,wrap it in setTimeout to make it async

  //this is async error use next in handler to address this error
  //next is used in handlers for errors only
  // setTimeout(() => {
  //   next(new Error("hello"));
  // }, 1);
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, thats on us" });
  }
});
// module.exports = app;
export default app;

import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";


const app = express();

// Third party middleware
app.use(morgan("dev"));


// routes { events }
app.use("/api/v3/app/events", routes.events);




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

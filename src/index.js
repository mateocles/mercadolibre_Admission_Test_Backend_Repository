const express = require("express");
const app = express();
const morgan = require("morgan");

//setting
app.set("port", process.env.PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "application/json",
    "text/json"
  );
  next();
});
//routes
app.use("/", require("./routes/routes"));

//start the serve
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

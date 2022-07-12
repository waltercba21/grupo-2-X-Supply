const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const mainRouter = require("./Routes/main");
const productsRouter = require("./Routes/products");
const usersRouter = require("./Routes/users");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "Es un secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(3000, () => {
  console.log("Puerto Activo");
});

app.use("/", mainRouter);

app.use("/users", usersRouter);

app.use("/products", productsRouter);

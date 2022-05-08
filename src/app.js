const express= require ("express");
const path = require ("path");
const app = express ();
const mainRouter= require ('./Routes/main');
const productsRouter = require ('./Routes/products');
const usersRouter = require ('./Routes/users');


app.set ('view engine', 'ejs');

app.set('views','./views');

app.use(express.static(path.join(__dirname, '../public')));


app.listen (3000, () => {
    console.log ("Puerto Activo")
});

app.use ('/', mainRouter);
app.use ('/index', mainRouter);
app.use ('/login', usersRouter);
app.use ('/products', productsRouter);

app.use ('/register', usersRouter);








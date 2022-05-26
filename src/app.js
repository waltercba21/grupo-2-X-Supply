const express= require ("express");
const path = require ("path");
const app = express ();
const methodOverride = require('method-override');
const mainRouter= require ('./Routes/main');
const productsRouter = require ('./Routes/products');
const usersRouter = require ('./Routes/users');




app.set ('view engine', 'ejs');

app.set('views','./views');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(methodOverride("_method"))



app.listen (3000, () => {
    console.log ("Puerto Activo")
});


app.use ('/', mainRouter);
app.use ('/index', mainRouter);
app.use ('/users', usersRouter);
app.use ('/', usersRouter);
app.use ('/products', productsRouter);
app.use ('/', productsRouter);

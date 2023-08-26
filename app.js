const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
// const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error');
const db = require('./util/database')
const app = express();

// app.engine('hbs',expressHbs({layoutsDir:'views/layouts/', defaultLayout:'main-layout', extname:'hbs'}));
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

// db.execute('SELECT * FROM products')
// .then(result=>{
//     console.log('result::',result);
// })
// .catch(err=>{
//     console.log('err::',err);
// });

app.use(bodyParse.urlencoded({extended:false}));

// specify static files path
app.use(express.static(path.join(__dirname,'public')));

// import routes
app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use(errorController.get404);

app.listen(4000)
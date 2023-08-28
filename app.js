const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParse.urlencoded({extended:false}));

// specify static files path
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next)=>{
    // User.findByPk(1)
    //     .then(user=>{
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err=>console.log(err));
    next();
});


// import routes
app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
})
const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParse.urlencoded({extended:false}));

// specify static files path
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next)=>{
    User.findById('64eecdefc76a17b16f4f2762')
        .then(user=>{
            // req.user = user;
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err=>console.log(err));
});


// import routes
app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
})
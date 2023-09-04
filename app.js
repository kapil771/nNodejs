const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const dotenv = require('dotenv');


dotenv.config();
const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
    uri:MONGODB_URI,
    collection:'sessions'
});

const csrfProtection = csrf()

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const authRoutes = require('./routes/auth.js');

app.use(bodyParse.urlencoded({extended:false}));

// specify static files path
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'my secret', 
    resave:false,
    saveUninitialized: false,
    store:store
}));
app.use(csrfProtection)
app.use(flash());

app.use((req, res, next)=>{
    console.log('req.session.user:::',req.session.user);
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
        .then(user=>{
            req.user = user;
            next(); 
        })
        .catch(err=>console.log(err));
});


app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})


// import routes
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(()=>{
//     app.listen(3000);
// })

mongoose
    .connect(
        MONGODB_URI
    )
    .then(result=>{
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
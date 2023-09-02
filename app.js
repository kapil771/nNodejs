const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
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
    User.findById('64f30ce33afd4bc648ff19a5')
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err=>console.log(err));
});


// import routes
app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use(errorController.get404);

// mongoConnect(()=>{
//     app.listen(3000);
// })

mongoose
    .connect(
        'mongodb+srv://kapilkumar10000:xeMC0hXuQyuHL3ib@cluster0.cqe5tgy.mongodb.net/shop_db?retryWrites=true&w=majority'
    )
    .then(result=>{
        User.findOne()
            .then(user=>{
                if(!user){
                    const user = new User({
                        name:'Kapil',
                        email:'kaps.logic@gmail.com',
                        cart:{
                            items:[]
                        }
                    });
                    user.save();
                }
            })
        
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
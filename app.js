const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
// const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const Product = require('./models/product');
const User = require('./models/user');

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

app.use((req, res, next)=>{
    User.findByPk(1)
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

Product.belongsTo(User,{
    constraints:true, 
    onDelete:'CASCADE'
});

User.hasMany(Product);

sequelize
    .sync({ force:true })
    .then(result=>{
        return User.findByPk(1);
        // console.log(result);
        // app.listen(3000);
    })
    .then(user=>{
        if(!user){
            return User.create({name:'Max',email:'test@test.com'});
        }
        return user;
    })
    .then(user=>{
        console.log(user);
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);      
    });

// app.listen(4000)
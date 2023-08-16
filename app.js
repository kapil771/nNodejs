const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const app = express();

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParse.urlencoded({extended:false}));

app.use(shopRoutes);
app.use('/admin',adminRoutes);

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','404.html'))
    // res.status(404).send('<h1>Page not found</h1>');
})

app.listen(4000)
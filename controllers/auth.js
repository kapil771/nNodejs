const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated:req.session.isLoggedIn
    });
};

exports.postLogin = (req,res,next)=>{
    // req.isLoggedIn = true;
    // res.setHeader('Set-Cookie','loggedIn=true; HttpOnly');
    // req.session.isLoggedIn = true;
    User.findById('64f30ce33afd4bc648ff19a5')
        .then(user=>{
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
};


exports.postLogout = (req,res,next)=>{
    req.session.destroy(err=>{
        console.log('err:::',err);
        res.redirect('/');
    });
};
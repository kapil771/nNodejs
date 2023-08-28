const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect(
        'mongodb+srv://kapilkumar10000:xeMC0hXuQyuHL3ib@cluster0.cqe5tgy.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(client=>{
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err=>{
        console.log(err);
        throw err;
    })
};

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No Database found!';
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

//Sequelize
/*const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'node-complete',
    'root',
    '', 
    {
        dialect:'mysql', 
        host:'localhost'
    }
);
module.exports = sequelize; */


// Mysql
/*const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:''
});
module.exports = pool.promise(); */
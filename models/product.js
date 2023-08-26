const products = [];
const fs = require('fs');
const path = require('path');

const db = require('../util/database');

const Cart = require('./cart');

const p = path.join(path.dirname(require.main.filename),'data','products.json');

const getProductsFromFile = (cb)=>{

    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product{
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // Save
    save(){
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        )
        
        // getProductsFromFile(products=>{
        //     if(this.id){
        //         const existingProductIndex = products.findIndex(product=>product.id===this.id);
        //         const updateProducts = [...products];
        //         updateProducts[existingProductIndex] = this;
        //         fs.writeFile(p,JSON.stringify(updateProducts),(err)=>{
        //             console.log(err);
        //         });
        //     }else{
        //         this.id = Math.random().toString();

        //         products.push(this);
        //         fs.writeFile(p,JSON.stringify(products),(err)=>{
        //             console.log(err);
        //         });
        //     }
        // });
    }

    // Get All Products
    static getAllProducts(cb){
        return db.execute('SELECT * FROM products');
        // getProductsFromFile(cb);
    }

    // Get Product By Id
    static getProductById(id){
        return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
        // getProductsFromFile(products => {
        //     const product = products.find(prod => prod.id === id);
        //     cb(product);
        // })
    }

    // Delete Product By id
    static deleteProductById(id,cb){
        // getProductsFromFile(products => {
        //     const product = products.find(prod=>prod.id===id);
        //     const updateProducts = products.filter(prod => prod.id !== id);
        //     fs.writeFile(p, JSON.stringify(updateProducts), err=>{
        //         if(!err){
        //             Cart.deleteProduct(id, product.price);
        //         }
        //     })
        // })
    }
}


// const products = [];
// const fs = require('fs');
// const path = require('path');

// module.exports = class Product{
//     constructor(t){
//         this.title = t;
//     }

//     save(){
//         const p = path.join(path.dirname(require.main.filename),'data','products.json');
//         fs.readFile(p,(err,fileContent)=>{
//             let products = [];
//             if(!err){
//                 products = JSON.parse(fileContent);
//             }
//             products.push(this);
//             fs.writeFile(p,JSON.stringify(products),(err)=>{
//                 console.log(err);
//             });
//             // console.log(err);
//             // console.log(fileContent);
//         });
//         // products.push(this);
//     }

//     static getAllProducts(cb){
//         const p = path.join(path.dirname(require.main.filename),'data','products.json');

//         fs.readFile(p,(err,fileContent)=>{
//             if(err){
//                 cb([]);
//             }
//             cb(JSON.parse(fileContent));
//         });
//     }
// }